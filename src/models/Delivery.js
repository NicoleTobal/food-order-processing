import Sequelize from 'sequelize';

export default class Delivery extends Sequelize.Model {}

export function initializeDeliveryModel(sequelize, Order, Address, Employee) {
  Delivery.init({
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    notes: {
      type: Sequelize.STRING,
    },
    deliveryDate: {
      type: Sequelize.DATE,
    },
    delivered: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {
    sequelize,
    modelName: 'Delivery',
    freezeTableName: true,
  });
};
