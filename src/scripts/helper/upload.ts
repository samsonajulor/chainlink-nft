import { NFTStorage, File } from 'nft.storage';
import mime from 'mime-types';
import fs from 'fs';
import path from 'path';
import {
  nft_storage_key,
} from '../../../secrets.json';


async function fileFromPath(filePath: string): Promise<File> {
  const content = await fs.promises.readFile(filePath);
  const type = mime.lookup(filePath) as string;
  return new File([content], path.basename(filePath), { type });
}

async function storeNFT(imagePath: string, name: string, description: string): Promise<any> {
  const image = await fileFromPath(imagePath);
  const nftStorage = new NFTStorage({ token: nft_storage_key });

  return nftStorage.store({ image, name, description });
}

async function main(imagePath: string, name: string, description: string): Promise<void> {
  try {
    const result = await storeNFT(imagePath, name, description);
    console.log('NFT stored successfully with CID:', result);
  } catch (err) {
    console.error('Error while creating the NFT:', err);
  }
}

export default main;
