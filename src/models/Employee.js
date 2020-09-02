import Sequelize from 'sequelize';

export default class Employee extends Sequelize.Model {}

export function initializeEmployeeModel(sequelize, Branch) {
  Employee.init({
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    surname: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
    },
    jobPosition: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {
    sequelize,
    modelName: 'Employee',
    freezeTableName: true,
    indexes: [{ unique: true, fields: ['email', 'jobPosition', 'branchId'] }]
  });
};
