# erc20-interactor

This repository contains three main apps/functionalities:

## Smart contracts (/contracts)
This functionality helps you deploy a ERC20 token using the hardhat framework. The contracts will be used by the following applications. You can deploy the ERC20 contract by following these steps:
1. Clone the repository ```git clone https://github.com/NicoSerranoP/erc20-interactor```
2. Go to the directory ```cd erc20-interactor/blockchain```
3. Install dependencies ```yarn install```
4. Compile the contract ```yarn hardhat compile```
5. Run the deploy script ```yarn hardhat run scripts/deploy.ts```
6. Copy the smart contract address and abi

*Remember to check that the ABI is the right one for the ERC20 with-mint-function contract. To get it use the hardhat framework in this repository.*

*Check out the use of NatSpec comments in the ERC20.sol file explaining why a mint function was created*

## Node Service (/server)
The node service is a web server that allows you to interact with specific ERC20 contracts. All routes are APIs that respond JSON values so you can easily use them in your app. You can run the server by following these steps:

1. Clone the repository ```git clone https://github.com/NicoSerranoP/erc20-interactor```
2. Go to the directory ```cd erc20-interactor/server```
3. Install dependencies ```npm install```
4. Run ```npm run dev```
5. Visit home for API instructions ```https://localhost:3300```

## React App (/app)
This app simply connects your Metamask wallet to an existing ERC20 smart contract set up in the .env files. (Sorry for the poor UI design, I hope one day I can make it better). To use it:
1. Clone the repository ```git clone https://github.com/NicoSerranoP/erc20-interactor```
2. Go to the directory ```cd erc20-interactor/blockchain```
3. Install dependencies ```yarn install```
4. Run the app ```npm run start```
5. Visit the home page of the app ```https://localhost:3000```


# To check how this works

1. Compile the ERC20 token using the Hardhat framework in the *blockchain* directory. You can use this: ```yarn hardhat compile```
2. Run some test to check that the ERC20 smart contract is working properly. You can use this: ```yarn hardhat test```
2. Deploy the ERC20 token so you get a contract address and ABI. You can use this command: ```yarn hardhat run --network goerli scripts/deploy.ts```
3. Copy the ABI into the .env file in the *server* directory. You can use the newly generated contract address or the one here [https://goerli.etherscan.io/address/0x4089b4000291a4e7c15714a1f1e630f4845ed645](https://goerli.etherscan.io/address/0x4089b4000291a4e7c15714a1f1e630f4845ed645)
4. Go to the *server* directory and start the application using the following command: ```npm run dev```
5. Visit the home [http://localhost:3300/](http://localhost:3300/) route in your browser to see how you can interact with the API. I did not use POST methods in order to make it simpler and faster to check (but right now I noticed that the home page might look better with some JSON prettifier)
6. To check how the react application works, run ```npm run start``` in the *app* directory. Remember to set up the .env values for the contract address and abi.

### APIs:
1. **Visualize:** shows you the main information of the ERC20 token. If the address does not have code or has a different ABI than a ERC20 then it notifies the user the incident. To get the data from the contract I use multiple Promises to optimize read-only time.

2. **Mint:** sends a transaction to the contract using the private key located in the .env file of the server directory. It uses callback to not block the call with too much use of await. It returns the transaction hash but without confirming that the transaction was sent, this is done to reduce blocking and wait time. The client side will take the hash and constantly ask another route for results.

3. **Check:** performs a read-only action to the blockchain in order to obtain the transaction receipt. The idea of this API is to reduce calls and wait time in the mint API by giving end users the ability to ask about transaction status in another route.