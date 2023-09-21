import { ethers } from 'hardhat';

async function main() {
  const NFTProtoAddress = '0x885b2F2C61774d09067071a088798170609FFFEB';

  const NFTProtoContract = await ethers.getContractAt('IProtoRandomNFT', NFTProtoAddress);

  const data = await NFTProtoContract.getInitialized();

  console.log(data);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
