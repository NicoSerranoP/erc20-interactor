import express, { Request, Response } from 'express';
import { ethers } from "ethers";
import dotenv from 'dotenv';

dotenv.config();

const apiRoute = '/erc20';
const abi = new ethers.utils.Interface(process.env.ABI!)
const provider = new ethers.providers.InfuraProvider(process.env.NETWORK, {
    'projectId': process.env.PROJECT_ID,
    'projectSecret': process.env.PROJECT_SECRET,
});

const erc20 = ( app: express.Application ) => {
    app.get(apiRoute + '/visualize/:contract', (req: Request, res: Response) => {
        // TODO:
        const contract = new ethers.Contract(req.params.contract, abi, provider);
        console.log(contract);
        res.send( 'send the contract details' );
    });

    app.post(apiRoute + '/mint/:contract', (req: Request, res: Response) => {
        // TODO:
        res.send('minted token!');
    });
};

export { erc20 };