import upload from './helper/upload';
import path from 'path';

const pathToImage = path.join(__dirname, './assets/samosky.jpg');

const data = {
  nft_image_path: pathToImage,
  nft_name: 'Samosky',
  nft_description: 'This is how I really look in real life.',
};
async function main() {
  const result = await upload(data.nft_image_path, data.nft_name, data.nft_description);

  console.log('NFT META File URL', result);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
