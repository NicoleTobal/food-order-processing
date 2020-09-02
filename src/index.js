import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { initializeDatabase } from './models/db';
import Logger from './utils/logger';
import fs from 'fs';
import Path from 'path';

const app = express();
const port = process.env.APP_PORT;
const dataFileName = process.env.DATA_FILENAME;

app.use(bodyParser.json());

app.listen(port, async () => {
  Logger.info(`Example app listening at http://localhost:${port}`);
  await initializeDatabase();
  // Checks if data loader file exists
  if (fs.existsSync(`${Path.resolve()}/.dbDataLoaders/${dataFileName}`)) {
    // If file exists, searches for loadData function
    const loadData = (await import(`${Path.resolve()}/.dbDataLoaders/${dataFileName}`)).default;
    if (loadData) {
      // Loads database initial data
      await loadData();
      Logger.info(`Initial data successfully loaded`);
    }
    else {
      Logger.error(`"loadData" function was not found in data loader file`);
    }
  }
});
