import Sequelize from 'sequelize';

export default class PaymentStatus extends Sequelize.Model {}

export function initializePaymentStatusModel(sequelize) {
  PaymentStatus.init({
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    description: {
      type: Sequelize.STRING,
    },
  }, {
    sequelize,
    modelName: 'PaymentStatus',
    freezeTableName: true,
    indexes: [{ unique: true, fields: ['description'] }]
  });
};
