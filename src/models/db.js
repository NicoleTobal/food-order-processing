import Sequelize from 'sequelize';
import Logger from '../utils/logger';
import Product, { initializeProductModel } from './Product';
import ProductFeatureType, { initializeProductFeatureTypeModel } from './ProductFeatureType';
import ProductFeature, { initializeProductFeatureModel } from './ProductFeature';
import ProductXProductFeature, { initializeProductXProductFeatureModel } from './ProductXProductFeature';
import Address, { initializeAddressModel } from './Address';
import Client, { initializeClientModel } from './Client';
import { initializeAddressXClientModel } from './AddressXClient';
import Branch, { initializeBranchModel } from './Branch';
import Delivery, { initializeDeliveryModel } from './Delivery';
import Employee, { initializeEmployeeModel } from './Employee';
import Order, { initializeOrderModel } from './Order';
import OrderStatus, { initializeOrderStatusModel } from './OrderStatus';
import OrderXProduct, { initializeOrderXProductModel } from './OrderXProduct';
import PaymentStatus, { initializePaymentStatusModel } from './PaymentStatus';
import PaymentType, { initializePaymentTypeModel } from './PaymentType';
import Payment, { initializePaymentModel } from './Payment';
import Pickup, { initializePickupModel } from './Pickup';

let sequelize;

export const initializeDatabase = async () => {
  try {
    // Sets db instance
    sequelize = await new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
      }
    );
    Logger.info('Database successfully initialized', 'initializeDatabase');
    // Initializes models
    initializeProductModel(sequelize);
    initializeProductFeatureTypeModel(sequelize);
    initializeProductFeatureModel(sequelize, ProductFeatureType);
    initializeProductXProductFeatureModel(sequelize, Product, ProductFeature);
    initializeAddressModel(sequelize);
    initializeClientModel(sequelize);
    initializeAddressXClientModel(sequelize, Address, Client);
    initializeBranchModel(sequelize, Address);
    initializeEmployeeModel(sequelize, Branch);
    initializeOrderStatusModel(sequelize);
    initializeOrderModel(sequelize, OrderStatus, Client);
    initializeDeliveryModel(sequelize, Order, Address, Employee);
    initializeOrderXProductModel(sequelize, Order, Product);
    initializePaymentStatusModel(sequelize);
    initializePaymentTypeModel(sequelize);
    initializePaymentModel(sequelize, Order, Client, PaymentStatus, PaymentType);
    initializePickupModel(sequelize, Order, Branch);

    // Drops old models
    await Pickup.drop();
    await Payment.drop();
    await PaymentType.drop();
    await PaymentStatus.drop();
    await OrderXProduct.drop();
    await Delivery.drop();
    await Order.drop();
    await OrderStatus.drop();
    await Employee.drop();
    await Branch.drop();
    await Client.drop();
    await Address.drop();
    await ProductXProductFeature.drop();
    await ProductFeature.drop();
    await ProductFeatureType.drop();
    await Product.drop();

    // Syncs Models
    await Product.sync();
    await ProductFeatureType.sync();
    await ProductFeature.sync();
    await ProductXProductFeature.sync();
    await Address.sync();
    await Client.sync();
    await Branch.sync();
    await Employee.sync();
    await OrderStatus.sync();
    await Order.sync();
    await Delivery.sync();
    await OrderXProduct.sync();
    await PaymentStatus.sync();
    await PaymentType.sync();
    await Payment.sync();
    await Pickup.sync();

    // Relationships are added
    ProductFeatureType.hasMany(ProductFeature, { foreignKey: { name: "productFeatureTypeId" } });
    Product.belongsToMany(ProductFeature, { through: ProductXProductFeature, foreignKey: "productId" });
    ProductFeature.belongsToMany(Product, { through: ProductXProductFeature, foreignKey: "productFeatureId" });

    // Loads Data
    const { dataValues: dessertDataValues } = await Product.create({ description: "Oblea de chocolate", price: 10.50 });
    const { dataValues: flavourDataValues } = await ProductFeatureType.create({ description: "Sabor" });
    const { dataValues: typeDataValues } = await ProductFeatureType.create({ description: "Tipo" });
    const { dataValues: chocolateDataValues } = await ProductFeature.create({ productFeatureTypeId: flavourDataValues.id, description: 'Chocolate'});
    const { dataValues: obleaDataValues } = await ProductFeature.create({ productFeatureTypeId: typeDataValues.id, description: 'Oblea'});
    await ProductXProductFeature.create({ productId: dessertDataValues.id, productFeatureId: chocolateDataValues.id });
    await ProductXProductFeature.create({ productId: dessertDataValues.id, productFeatureId: obleaDataValues.id });
    await Address.create({ xCoordenate: 10.4300709, yCoordenate: -66.8657452})
  } catch (err) {
    Logger.error(err.message, 'initializeDatabase', err);
  }
};

export default sequelize;
