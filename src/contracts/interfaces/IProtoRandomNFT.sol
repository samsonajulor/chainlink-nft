// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

interface IProtoRandomNFT {
    // NFT Properties
    enum Props {
        name,
        description,
        speed,
        strength,
        intelligence
    }
    function requestNft() external returns (uint256 requestId);
    function getChanceArray() external pure returns (uint256[3] memory);
    function getPropsFromModdedRng(uint256 moddedRng) external pure returns (Props);
    function withdraw() external;
    function getNftTokenUris(uint256 index) external view returns (string memory);
    function getInitialized() external view returns (bool);
    function getTokenCounter() external view returns (uint256);
}