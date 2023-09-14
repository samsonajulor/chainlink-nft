import { ethers } from "hardhat";

const nftTokenUris = [
  'ipfs://bafyreifbig22s4jhbehclwggxdzi3tevwclj56utjetlhpxc4y26aowaui/metadata.json',
  'ipfs://bafyreid6yivkwmrmxt5p4ofzrelcnutyjroo6wllrxw6oqaqdz3e5p6sji/metadata.json',
  'ipfs://bafyreifoygwvwcfpm4dsxaab3cisewkpxsyvh22gehiomneadiyln3c5ri/metadata.json',
];

// (
//         address vrfCoordinatorV2,
//         uint64 suscriptionId,
//         bytes32 gasLane,
//         uint32 callbackGasLimit,
//         string[3] memory nftTokenUris
//     )

// nftProto contract deployed at: 0xD4C42e502669947139D736b693C97b82D4d01F48
async function main() {
  const subscriptionId: string = "8735";
  const callBackGasLimit: number = 500000;
  const gasLane: string = "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15";
  const vrf_coordinator_v2: string = '0xd4c42e502669947139d736b693c97b82d4d01f48';
  const link_token: string = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";

  const NFTProto = await ethers.deployContract('ProtoRandomNFT', [
    vrf_coordinator_v2,
    subscriptionId,
    gasLane,
    callBackGasLimit,
    nftTokenUris,
  ]);

  await NFTProto.waitForDeployment();

  console.log(`NFTProto deployed to ${NFTProto.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
