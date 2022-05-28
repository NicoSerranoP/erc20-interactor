import express, { Request, Response } from 'express';

import { erc20 } from './erc20';

const index = (app: express.Application) => {
    app.get('/', (req: Request, res: Response) => {
        res.json({
            'message': 'Welcome to the ERC interator service',
            'routes': [
                {
                    'name':'Visualize',
                    'url': '/erc20/visualize',
                    'description': 'See the smart contract attributes'
                },
                {
                    'name':'Interact',
                    'url': '/erc20/visualize',
                    'description': 'See the smart contract attributes'
                },
                {
                    'name':'Switch',
                    'url': '/erc20/visualize',
                    'description': 'See the smart contract attributes'
                }
            ],
        });
    });
};

const run = (app: express.Application) => {
    index(app);
    erc20(app);
};

export { run };