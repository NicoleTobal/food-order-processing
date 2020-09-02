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
    },
    orderStatusId: {
      type: Sequelize.INTEGER,
      references: {
        model: OrderStatus,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    clientId: {
      type: Sequelize.INTEGER,
      references: {
        model: Client,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
    freezeTableName: true,
  });
};
