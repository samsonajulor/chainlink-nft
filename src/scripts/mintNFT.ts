import { ethers } from 'hardhat';

const storedNFTOnIPFS = {
  ipnft: 'bafyreiblrs3ktv36q3o2ssatubyfndoo4z3dg3agn3qpgdsmuao7a5sqoy',
  url: 'ipfs://bafyreiblrs3ktv36q3o2ssatubyfndoo4z3dg3agn3qpgdsmuao7a5sqoy/metadata.json'
}

async function main() {
  // get caller address
  const [signer] = await ethers.getSigners()
  const NFTProtoAddress = '0x168Ca561E63C868b0F6cC10a711d0b4455864f17';

  const NFTProtoContract = await ethers.getContractAt('INFTProto', NFTProtoAddress);

  const setTokenData = await NFTProtoContract.mintNFT(
    signer.address,
    'bafyreiblrs3ktv36q3o2ssatubyfndoo4z3dg3agn3qpgdsmuao7a5sqoy'
  );
  // @ts-ignore
  const setTokenDataLog = (await setTokenData.wait())?.logs;
  console.log(setTokenDataLog);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
