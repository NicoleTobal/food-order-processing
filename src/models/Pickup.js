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
    orderId: {
      type: Sequelize.INTEGER,
      references: {
        model: Order,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    branchId: {
      type: Sequelize.INTEGER,
      references: {
        model: Branch,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
  }, {
    sequelize,
    modelName: 'Pickup',
    freezeTableName: true,
  });
};
