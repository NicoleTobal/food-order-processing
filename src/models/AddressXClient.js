import Sequelize from 'sequelize';

export default class AddressXClient extends Sequelize.Model {}

export function initializeAddressXClientModel(sequelize, Address, Client) {
  AddressXClient.init({
    addressId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: Address,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    clientId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: Client,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    notes: {
      type: Sequelize.STRING,
    },
  }, {
    sequelize,
    modelName: 'AddressXClient',
    freezeTableName: true,
  });
};
