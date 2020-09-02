import Sequelize from 'sequelize';

export default class Product extends Sequelize.Model {}

export function initializeProductModel (sequelize) {
  Product.init({
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
    price: {
      type: Sequelize.DOUBLE,
    },
    description: {
      type: Sequelize.STRING,
    },
  }, {
    sequelize,
    modelName: 'Product',
    freezeTableName: true,
    indexes: [{ unique: true, fields: ['description'] }]
  });
};
