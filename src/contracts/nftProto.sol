// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;
// create an nft contract conforming to the openzeppelin ERC721 standard

// import the openzeppelin ERC721 contract
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract NFTProto is ERC721URIStorage {
    constructor() ERC721("NFTProto", "NFTP") {}

    uint256 private tokenId;

    function mintNFT(address recipient, string memory _tokenURI) public {
        tokenId++;
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }
}
