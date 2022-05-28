# erc20-interactor

This repository contains three main apps/functionalities:

## Smart contracts (/contracts)
This functionality helps you deploy a ERC20 token using the hardhat framework. The contracts will be used by the following two applications. You can deploy the ERC20 contract by following these steps:
1. Clone the repository ```git clone https://github.com/NicoSerranoP/erc20-interactor```
2. Go to the directory ```cd erc20-interactor/blockchain```
3. Install dependencies ```yarn install```
4. Compile the contract ```yarn hardhat compile```
5. Run the deploy script ```yarn hardhat run scripts/deploy.ts```
6. Copy the smart contract address and abi


## Node Service (/server)
The node service is a web server that allows you to interact with specific ERC20 contracts. All routes are APIs that respond JSON values so you can easily use them in your app. You can run the server by following these steps:

1. Clone the repository ```git clone https://github.com/NicoSerranoP/erc20-interactor```
2. Go to the directory ```cd erc20-interactor/server```
3. Install dependencies ```npm install```
4. Run ```npm run dev```
5. Visit home for API instructions ```https://localhost:3300```


## React App (/app)
TODO