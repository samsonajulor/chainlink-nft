import { ethers } from "hardhat";

const nftTokenUris = [
  'ipfs://bafyreifbig22s4jhbehclwggxdzi3tevwclj56utjetlhpxc4y26aowaui/metadata.json',
  'ipfs://bafyreid6yivkwmrmxt5p4ofzrelcnutyjroo6wllrxw6oqaqdz3e5p6sji/metadata.json',
  'ipfs://bafyreifoygwvwcfpm4dsxaab3cisewkpxsyvh22gehiomneadiyln3c5ri/metadata.json',
];

// nftProto contract deployed at: 0x885b2F2C61774d09067071a088798170609FFFEB
async function main() {
  const subscriptionId: string = '14245';
  const callBackGasLimit: number = 500000;
  const gasLane: string = "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c"; // for the sepolia testnet
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
