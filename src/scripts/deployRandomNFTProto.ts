import { ethers } from "hardhat";

const nftTokenUris = [
  'ipfs://bafyreifbig22s4jhbehclwggxdzi3tevwclj56utjetlhpxc4y26aowaui/metadata.json',
  'ipfs://bafyreid6yivkwmrmxt5p4ofzrelcnutyjroo6wllrxw6oqaqdz3e5p6sji/metadata.json',
  'ipfs://bafyreifoygwvwcfpm4dsxaab3cisewkpxsyvh22gehiomneadiyln3c5ri/metadata.json',
];

// nftProto contract deployed at: 0x57Df052B630Dd1a713C91CB87FAE9fC03AA3182a
async function main() {
  const subscriptionId: string = '14245';
  const callBackGasLimit: number = 500000;
  const gasLane: string = "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15";
  const vrf_coordinator_v2: string = '0x2ca8e0c643bde4c2e08ab1fa0da3401adad7734d';
  const link_token: string = '0x326c977e6efc84e512bb9c30f76e30c160ed06fb';

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
