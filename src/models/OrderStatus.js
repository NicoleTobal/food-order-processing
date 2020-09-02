import Sequelize from 'sequelize';

export default class OrderStatus extends Sequelize.Model {}

export function initializeOrderStatusModel(sequelize) {
  OrderStatus.init({
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
    modelName: 'OrderStatus',
    freezeTableName: true,
    indexes: [{ unique: true, fields: ['description'] }]
  });
};
