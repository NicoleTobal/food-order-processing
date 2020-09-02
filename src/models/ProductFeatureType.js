import Sequelize from 'sequelize';

export default class ProductFeatureType extends Sequelize.Model {}

export function initializeProductFeatureTypeModel(sequelize) {
  ProductFeatureType.init({
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
    modelName: 'ProductFeatureType',
    freezeTableName: true,
    indexes: [{ unique: true, fields: ['description'] }]
  });
};
