import { ethers } from 'hardhat';

async function main() {
  const NFTProtoAddress = '0x57Df052B630Dd1a713C91CB87FAE9fC03AA3182a';

  const NFTProtoContract = await ethers.getContractAt('IProtoRandomNFT', NFTProtoAddress);

  const setTokenData = await NFTProtoContract.requestNft();
  // @ts-ignore
  const setTokenDataLog = (await setTokenData.wait())?.logs;
  console.log(setTokenDataLog);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
