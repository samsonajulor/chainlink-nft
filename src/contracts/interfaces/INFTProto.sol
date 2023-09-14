// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

interface INFTProto {
    function mintNFT(address recipient, string memory _tokenURI) external;
}