import Sequelize from 'sequelize';

export default class ProductFeature extends Sequelize.Model {}

export function initializeProductFeatureModel(sequelize, ProductFeatureType) {
  ProductFeature.init({
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
    productFeatureTypeId: {
      type: Sequelize.INTEGER,
      references: {
        model: ProductFeatureType,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  }, {
    sequelize,
    modelName: 'ProductFeature',
    freezeTableName: true,
  });
};
