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
                    'method': 'POST',
                    'params': {
                        'toAddress': 'string',
                    },
                    'url': '/erc20/mint/<contractAddress>',
                    'description': 'Mint a new token'
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