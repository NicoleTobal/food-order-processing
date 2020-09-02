import Sequelize from 'sequelize';

export default class OrderXProduct extends Sequelize.Model {}

export function initializeOrderXProductModel(sequelize, Order, Product) {
  OrderXProduct.init({
    orderId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: Order,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    productId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: Product,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    notes: {
      type: Sequelize.STRING,
    },
  }, {
    sequelize,
    modelName: 'OrderXProduct',
    freezeTableName: true,
  });
};
