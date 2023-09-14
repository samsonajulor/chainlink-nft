import upload from './helper/upload';
import path from 'path';

const path1 = path.join(__dirname, './assets/cyberpunk.jpeg');
const path2 = path.join(__dirname, './assets/puny.jpeg');
const path3 = path.join(__dirname, './assets/robots.jpeg');

const data = [
  {
    path: path1,
    name: 'cyberpunk',
    description: 'This is a huge and fast monster robot do. It can control the elements of wind and air.',
    speed: 100,
    strength: 98,
    intelligence: 99
  },
  {
    path: path2,
    name: 'puny',
    description: 'This is a quick and fast robot. With AI implemented.',
    speed: 100,
    strength: 97,
    intelligence: 75
  },
  {
    path: path3,
    name: 'puny',
    description: 'This is a quick and fast robot. With AI implemented.',
    speed: 100,
    strength: 97,
    intelligence: 75
  }
];

async function main() {
  let result: any[] = [];

  for (const payload of data) {
    const res = await upload(payload.path, payload.name, payload.description, payload.speed, payload.strength, payload.intelligence);
    console.log('NFT META File Data', res)
    result.push(res);
  }
  console.log('NFT META File DataAll', result);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
