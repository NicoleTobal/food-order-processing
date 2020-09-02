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
    orderId: {
      type: Sequelize.INTEGER,
      references: {
        model: Order,
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
    },
    paymentStatusId: {
      type: Sequelize.INTEGER,
      references: {
        model: PaymentStatus,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    paymentTypeId: {
      type: Sequelize.INTEGER,
      references: {
        model: PaymentType,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  }, {
    sequelize,
    modelName: 'Payment',
    freezeTableName: true,
  });
};
