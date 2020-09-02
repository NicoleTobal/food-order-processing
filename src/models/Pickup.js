import Sequelize from 'sequelize';

export default class Pickup extends Sequelize.Model {}

export function initializePickupModel(sequelize, Order, Branch) {
  Pickup.init({
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    notes: {
      type: Sequelize.STRING,
    },
    pickupDate: {
      type: Sequelize.DATE,
    },
    retrieved: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'Pickup',
    freezeTableName: true,
  });
};
