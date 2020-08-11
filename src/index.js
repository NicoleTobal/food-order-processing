import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { initializeDatabase } from './models/db';
import Logger from './utils/logger';

const app = express();
const port = process.env.APP_PORT;

app.use(bodyParser.json());

app.listen(port, async () => {
  Logger.info(`Example app listening at http://localhost:${port}`);
  await initializeDatabase();
});
