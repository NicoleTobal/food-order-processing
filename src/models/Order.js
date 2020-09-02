import Sequelize from 'sequelize';

export default class Order extends Sequelize.Model {}

export function initializeOrderModel(sequelize, OrderStatus, Client) {
  Order.init({
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    notes: {
      type: Sequelize.STRING,
    }
  }, {
    sequelize,
    modelName: 'Order',
    freezeTableName: true,
  });
};
