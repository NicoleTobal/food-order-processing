import Sequelize from 'sequelize';

export default class PaymentType extends Sequelize.Model {}

export function initializePaymentTypeModel(sequelize) {
  PaymentType.init({
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
    modelName: 'PaymentType',
    freezeTableName: true,
    indexes: [{ unique: true, fields: ['description'] }]
  });
};
