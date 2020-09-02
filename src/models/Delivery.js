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
    },
    orderId: {
      type: Sequelize.INTEGER,
      references: {
        model: Order,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    addressId: {
      type: Sequelize.INTEGER,
      references: {
        model: Address,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    employeeId: {
      type: Sequelize.INTEGER,
      references: {
        model: Employee,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  }, {
    sequelize,
    modelName: 'Delivery',
    freezeTableName: true,
  });
};
