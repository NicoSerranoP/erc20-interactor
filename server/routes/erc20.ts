import express, { Request, Response } from 'express';

const apiRoute = '/erc20';

const erc20 = ( app: express.Application ) => {
    app.get(apiRoute + '/visualize', (req: Request, res: Response) => {
        // TODO:
        res.send( 'send the contract details' );
    });
};

export { erc20 };