# uniswap-proto

This Contract was deployed to goerli testnet via the following commands

- RUN `cd src`
- RUN `npx hardhat compile`
- RUN `npx hardhat run scripts/uploadNFTToIPFS.ts --network goerli`
- RUN `npx hardhat run scripts/deployRandomNFTProto.ts --network goerli`

#### Verifying the tokens
- RUN `npx hardhat verify --contract contracts/nftProto.sol:NFTProto  --network goerli 0x168Ca561E63C868b0F6cC10a711d0b4455864f17` to verify the ethTok
- verification url: [nftProto url]()


#### Mint the nft with the contract to goerli testnet
- RUN `npx hardhat run scripts/mintNFT.ts --network goerli`

#### Find the minted nft here
[minted nft on opensea testnet]()

#### For a list of available gas lanes on each network,
- see [supported networks on chain-link](https://docs.chain.link/docs/vrf/v2/subscription/supported-networks/#configurations)

Request testnet LINK and ETH here: [get link faucets](https://faucets.chain.link/)
Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: [link faucets docs](https://docs.chain.link/docs/link-token-contracts/)
