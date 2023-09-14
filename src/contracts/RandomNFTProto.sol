// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

error ProtoRandomNFT_AllreadyInitialized();
error ProtoRandomNFT_NeedMoreFunds();
error ProtoRandomNFT_RangeOutOfBounds();
error ProtoRandomNFT_TransferFailed();

contract ProtoRandomNFT is ERC721URIStorage, VRFConsumerBaseV2, Ownable {
    // NFT Properties
    enum Props {
        speed,
        strength,
        intelligence
    }

    // Chainlink VRF Variables
    VRFCoordinatorV2Interface private immutable vrfCoordinator;
    uint64 private immutable _suscriptionId;
    bytes32 private immutable _gasLane;
    uint32 private immutable _callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1;

    // NFT Variables
    uint256 private immutable i_mintFee;
    uint256 private s_tokenCounter;
    uint256 internal constant MAX_CHANCE_VALUE = 100;
    string[] internal nftTokenUrisStorage;
    bool private isInitialized;

    // Helpers for Chainlink VRF
    mapping(uint256 => address) public s_requestIdToSender;

    // Events
    event NftRequested(uint256 indexed requestId, address requester);
    event NftMinted(Props props, address minter);

    constructor(
        address vrfCoordinatorV2,
        uint64 suscriptionId,
        bytes32 gasLane,
        uint256 mintFee,
        uint32 callbackGasLimit,
        string[3] memory nftTokenUris
    )
        VRFConsumerBaseV2(vrfCoordinatorV2)
        ERC721("NFT Proto with Randomness", "NPR")
    {
        vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        _gasLane = gasLane;
        _suscriptionId = suscriptionId;
        i_mintFee = mintFee;
        _callbackGasLimit = callbackGasLimit;
        _initializeContract(nftTokenUris);
        s_tokenCounter = 0;
    }

    // Request NFT based on the requestID
    function requestNft() public payable returns (uint256 requestId) {
        if (msg.value < i_mintFee) {
            revert ProtoRandomNFT_NeedMoreFunds();
        }
        requestId = vrfCoordinator.requestRandomWords(
            _gasLane,
            _suscriptionId,
            REQUEST_CONFIRMATIONS,
            _callbackGasLimit,
            NUM_WORDS
        );

        s_requestIdToSender[requestId] = msg.sender;
        emit NftRequested(requestId, msg.sender);
    }

    // Fulfill Chainlink Randomness Request

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords)
        internal
        override
    {
        address nftOwner = s_requestIdToSender[requestId];
        uint256 newItemId = s_tokenCounter;
        s_tokenCounter = s_tokenCounter + 1;
        uint256 moddedRng = randomWords[0] % MAX_CHANCE_VALUE;
        Props nftProps = getPropsFromModdedRng(moddedRng);
        _safeMint(nftOwner, newItemId);
        _setTokenURI(newItemId, nftTokenUrisStorage[uint256(nftProps)]);
        emit NftMinted(nftProps, nftOwner);
    }

    // Get the Change to get a specific Props
    function getChanceArray() public pure returns (uint256[3] memory) {
        return [20, 50, MAX_CHANCE_VALUE];
    }

    // Initialize Contract

    function _initializeContract(string[3] memory nftTokenUris) private {
        if (isInitialized) {
            revert ProtoRandomNFT_AllreadyInitialized();
        }
        nftTokenUris = nftTokenUris;
        isInitialized = true;
    }

    // Get Props from Modded RNG
    function getPropsFromModdedRng(uint256 moddedRng)
        public
        pure
        returns (Props)
    {
        uint256 totalSum = 0;
        uint256[3] memory changeArray = getChanceArray();
        for (uint256 i = 0; i < changeArray.length; i++) {
            if (moddedRng >= totalSum && moddedRng < changeArray[i]) {
                return Props(i);
            }
            totalSum += changeArray[i];
        }
        revert ProtoRandomNFT_RangeOutOfBounds();
    }

    // Withdraw Funds
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        if (!success) {
            revert ProtoRandomNFT_TransferFailed();
        }
    }

    // Getters
    function getMintFee() public view returns (uint256) {
        return i_mintFee;
    }

    function getNftTokenUris(uint256 index)
        public
        view
        returns (string memory)
    {
        return nftTokenUrisStorage[index];
    }

    function getInitialized() public view returns (bool) {
        return isInitialized;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}