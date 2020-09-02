import Sequelize from 'sequelize';

export default class Payment extends Sequelize.Model {}

export function initializePaymentModel(sequelize, Order, Client, PaymentStatus, PaymentType) {
  Payment.init({
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: Sequelize.DOUBLE,
    },
  }, {
    sequelize,
    modelName: 'Payment',
    freezeTableName: true,
  });
};
