import Sequelize from 'sequelize';

export default class Client extends Sequelize.Model {}

export function initializeClientModel(sequelize) {
  Client.init({
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    surname: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
    },
    instagram: {
      type: Sequelize.STRING,
    },
    twitter: {
      type: Sequelize.STRING,
    },
    facebook: {
      type: Sequelize.STRING,
    },
  }, {
    sequelize,
    modelName: 'Client',
    freezeTableName: true,
    indexes: [{ unique: true, fields: ['email'] }]
  });
};
