import Sequelize from 'sequelize';
import Logger from '../utils/logger';

let sequelize;

export const initializeDatabase = () => {
  try {
    // Sets db instance
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: 'postgres',
      }
    );
    Logger.info('Database successfully initialized', 'initializeDatabase');
  } catch (err) {
    Logger.error(err.message, 'initializeDatabase', err);
  }
};

export const getDb = () => sequelize;
