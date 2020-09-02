import Sequelize from 'sequelize';

export default class Branch extends Sequelize.Model {}

export function initializeBranchModel(sequelize, Address) {
  Branch.init({
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
    name: {
      type: Sequelize.STRING,
    },
    notes: {
      type: Sequelize.STRING,
    },
    addressId: {
      type: Sequelize.INTEGER,
      references: {
        model: Address,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  }, {
    sequelize,
    modelName: 'Branch',
    freezeTableName: true,
    indexes: [{ unique: true, fields: ['name'] }]
  });
};
