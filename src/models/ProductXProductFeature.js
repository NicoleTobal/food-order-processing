import Sequelize from 'sequelize';

export default class ProductXProductFeature extends Sequelize.Model {}

export function initializeProductXProductFeatureModel(sequelize, Product, ProductFeature) {
  ProductXProductFeature.init({
    productId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: Product,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    productFeatureId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: ProductFeature,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  }, {
    sequelize,
    modelName: 'ProductXProductFeature',
    freezeTableName: true,
  });
};
