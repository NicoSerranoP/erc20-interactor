import express, { Request, Response } from 'express';

import { erc20 } from './erc20';

const index = (app: express.Application) => {
    app.get('/', (req: Request, res: Response) => {
        res.json({
            'message': 'Welcome to the ERC interator service',
            'routes': [
                {
                    'name':'Visualize',
                    'url': '/erc20/visualize/<contractAddress>',
                    'method': 'GET',
                    'params': {},
                    'description': 'See the smart contract attributes and state'
                },
                {
                    'name':'Mint',
                    'method': 'GET',
                    'params': {},
                    'url': '/erc20/mint/<contractAddress>/to/<toAddress>/amount/<amount>',
                    'description': 'Mint a specific amount of tokens to a specific address'
                },
                {
                    'name':'Check',
                    'method': 'GET',
                    'params': {},
                    'url': '/erc20/check/<transactionHash>',
                    'description': 'Check if a specific transaction has been accepted on the blockchain and other receipt details'
                },
            ],
        });
    });
};

const run = (app: express.Application) => {
    index(app);
    erc20(app);
};

export { run };