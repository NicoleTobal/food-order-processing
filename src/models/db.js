import Sequelize from 'sequelize';
import Logger from '../utils/logger';
import Product, { initializeProductModel } from './Product';
import ProductFeatureType, { initializeProductFeatureTypeModel } from './ProductFeatureType';
import ProductFeature, { initializeProductFeatureModel } from './ProductFeature';
import ProductXProductFeature, { initializeProductXProductFeatureModel } from './ProductXProductFeature';
import Address, { initializeAddressModel } from './Address';
import Client, { initializeClientModel } from './Client';
import AddressXClient, { initializeAddressXClientModel } from './AddressXClient';
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
    Logger.info('Database instance successfully initialized', 'initializeDatabase');
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
    Logger.info('Models successfully initialized', 'initializeDatabase');

    // Relationships are added
    ProductFeature.belongsTo(ProductFeatureType, { foreignKey: { name: "productFeatureTypeId" } });
    Product.belongsToMany(ProductFeature, { through: ProductXProductFeature, foreignKey: "productId" });
    ProductFeature.belongsToMany(Product, { through: ProductXProductFeature, foreignKey: "productFeatureId" });
    Address.belongsToMany(Client, { through: AddressXClient, foreignKey: "addressId" });
    Client.belongsToMany(Address, { through: AddressXClient, foreignKey: "clientId" });
    Branch.belongsTo(Address, { foreignKey: { name: "addressId" } });
    Delivery.belongsTo(Address, { foreignKey: { name: "addressId" } });
    Delivery.belongsTo(Order, { foreignKey: { name: "orderId" } });
    Delivery.belongsTo(Employee, { foreignKey: { name: "employeeId" } });
    Employee.belongsTo(Branch, { foreignKey: { name: "branchId" } });
    Order.belongsTo(OrderStatus, { foreignKey: { name: "orderStatusId" } });
    Order.belongsTo(Client, { foreignKey: { name: "clientId" } });
    Order.belongsToMany(Product, { through: OrderXProduct, foreignKey: "orderId" });
    Product.belongsToMany(Order, { through: OrderXProduct, foreignKey: "productId" });
    Payment.belongsTo(Order, { foreignKey: { name: "orderId" } });
    Payment.belongsTo(Client, { foreignKey: { name: "clientId" } });
    Payment.belongsTo(PaymentStatus, { foreignKey: { name: "paymentStatusId" } });
    Payment.belongsTo(PaymentType, { foreignKey: { name: "paymentTypeId" } });
    Pickup.belongsTo(Order, { foreignKey: { name: "orderId" } });
    Pickup.belongsTo(Branch, { foreignKey: { name: "branchId" } });
    Logger.info('Database relationships successfully initialized', 'initializeDatabase');

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
    Logger.info('Old schema successfully dropped', 'initializeDatabase');
    
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
    Logger.info('Models successfully synched', 'initializeDatabase');
  } catch (err) {
    Logger.error(err.message, 'initializeDatabase', err);
  }
};

export default sequelize;
