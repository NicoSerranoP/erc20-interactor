import express from 'express';
import dotenv from 'dotenv';

import * as routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT;

routes.run( app );

app.listen(port, () => {
  console.log(`⚡️[server]: Running at https://localhost:${port}`);
});