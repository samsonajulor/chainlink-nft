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
        name,
        description,
        speed,
        strength,
        intelligence
    }

    // VRF Variables for CHAINLINK
    VRFCoordinatorV2Interface private immutable vrfCoordinator;
    uint64 private immutable _suscriptionId;
    bytes32 private immutable _gasLane;
    uint32 private immutable _callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 1;
    uint32 private constant NUM_WORDS = 1;

    // NFT Variables
    uint256 private tokenCounter;
    uint256 internal constant MAX_CHANCE_VALUE = 100;
    string[] internal nftTokenUrisStorage;
    bool private isInitialized;

    mapping(uint256 => address) public requestIdToSenderMap;

    // Events
    event NftRequested(uint256 indexed requestId, address requester);
    event NftMinted(Props props, address minter);

    // easy constructor
    // correct address without checksum: 0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D
    // constructor(
    // )
    //     VRFConsumerBaseV2(0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D)
    //     ERC721("NFT Proto with Randomness", "NPR")
    // {
    //     vrfCoordinator = VRFCoordinatorV2Interface(0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D);
    //     _gasLane = 0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c;
    //     _suscriptionId = 14245;
    //     _callbackGasLimit = 500000;
    //     _initializeContract([ "ipfs://bafyreifbig22s4jhbehclwggxdzi3tevwclj56utjetlhpxc4y26aowaui/metadata.json", "ipfs://bafyreid6yivkwmrmxt5p4ofzrelcnutyjroo6wllrxw6oqaqdz3e5p6sji/metadata.json",   "ipfs://bafyreifoygwvwcfpm4dsxaab3cisewkpxsyvh22gehiomneadiyln3c5ri/metadata.json"]);
    //     tokenCounter = 0;
    // }

    constructor(
        address vrfCoordinatorV2,
        uint64 suscriptionId,
        bytes32 gasLane,
        uint32 callbackGasLimit,
        string[3] memory nftTokenUris
    )
        VRFConsumerBaseV2(vrfCoordinatorV2)
        ERC721("NFT Proto with Randomness", "NPR")
    {
        vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        _gasLane = gasLane;
        _suscriptionId = suscriptionId;
        _callbackGasLimit = callbackGasLimit;
        _initializeContract(nftTokenUris);
        tokenCounter = 0;
    }

    // Request NFT based on the requestID
    function requestNft() public returns (uint256 requestId) {
        requestId = vrfCoordinator.requestRandomWords(
            _gasLane,
            _suscriptionId,
            REQUEST_CONFIRMATIONS,
            _callbackGasLimit,
            NUM_WORDS
        );

        requestIdToSenderMap[requestId] = msg.sender;
        emit NftRequested(requestId, msg.sender);
    }

    // Fulfill Chainlink Randomness Request

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords)
        internal
        override
    {
        address nftOwner = requestIdToSenderMap[requestId];
        uint256 newItemId = tokenCounter;
        tokenCounter = tokenCounter + 1;
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

    function _initializeContract(string[3] memory nftTokenUris_) private {
        if (isInitialized) {
            revert ProtoRandomNFT_AllreadyInitialized();
        }
        nftTokenUrisStorage = nftTokenUris_;
        isInitialized = true;
    }

    // Get Props from Modded RNG
    function getPropsFromModdedRng(uint256 moddedRng)
        public
        pure
        returns (Props)
    {
        uint256 totalSum = 0;
        uint256[3] memory chanceArray = getChanceArray();
        for (uint256 i = 0; i < chanceArray.length; i++) {
            if (moddedRng >= totalSum && moddedRng < chanceArray[i]) {
                return Props(i);
            }
            totalSum += chanceArray[i];
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
        return tokenCounter;
    }
}
