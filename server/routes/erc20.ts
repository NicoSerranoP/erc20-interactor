import express, { Request, Response } from 'express';
import { ethers } from "ethers";
import dotenv from 'dotenv';
import { contractIsValid } from '../utils';

dotenv.config();

const apiRoute = '/erc20';
const abi = new ethers.utils.Interface(process.env.ABI!)
const provider = new ethers.providers.InfuraProvider(process.env.NETWORK, {
    'projectId': process.env.PROJECT_ID,
    'projectSecret': process.env.PROJECT_SECRET,
});
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const erc20 = ( app: express.Application ) => {
    app.get(apiRoute + '/visualize/:contract', async (req: Request, res: Response) => {
        // Validate the address, contract and ABI
        const err = await contractIsValid(req.params.contract, abi, provider);
        if (err !== ''){
            res.json({'message': err});
            return;
        }

        // Get contract information and state
        const contract = new ethers.Contract(req.params.contract, abi, provider);
        const [name, symbol, hexTotalSupply, decimals] = await Promise.all([
            contract.name(),
            contract.symbol(),
            contract.totalSupply(),
            contract.decimals()
        ]).catch((e: any) => {
            res.json({'message': 'There was an error calling attributes: ' + e});
            return;
        }) || [null, null, null, null];
        const numTotalSupply = parseInt(hexTotalSupply, 16);
        res.json({
            name,
            symbol,
            numTotalSupply,
            decimals
        });
    });

    app.get(apiRoute + '/mint/:contract/to/:toAddress/amount/:amount', async (req: Request, res: Response) => {
        // Validate the address, contract and ABI
        const err = await contractIsValid(req.params.contract, abi, provider);
        if (err !== ''){
            res.json({'message': err});
            return;
        }

        const contract = new ethers.Contract(req.params.contract, abi, wallet);
        contract.mint(req.params.toAddress, req.params.amount).then((tx: { hash: any; }) => {
            res.json({
                'message': 'Transaction sent. Use the hash to check status',
                'hash': tx.hash,
            });
            return;
        }).catch((e: any) => {
            res.json({'message': `There was an error sending the transaction: ${e}`});
            return;
        });
    });

    app.get(apiRoute + '/check/:hash', async (req: Request, res: Response) => {
        provider.getTransactionReceipt(req.params.hash).then((receipt) => {
            res.json({
                'message':'The transaction receipt is valid. Check number of confirmations in the receipt object',
                'receipt': receipt,
            })
        }).catch((e) => {
            res.json({'message': `There was an error fetching/consulting the transaction: ${e}`});
            return;
        });
    });
};

export { erc20 };