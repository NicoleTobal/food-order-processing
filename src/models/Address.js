import Sequelize from 'sequelize';

export default class Address extends Sequelize.Model {}

export function initializeAddressModel(sequelize) {
  Address.init({
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    xCoordenate: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    yCoordenate: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    zip: {
      type: Sequelize.INTEGER,
    },
    address: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    region: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    }
  }, {
    sequelize,
    modelName: 'Address',
    freezeTableName: true,
    indexes: [{ unique: true, fields: ['xCoordenate', 'yCoordenate'] }]
  });
};
