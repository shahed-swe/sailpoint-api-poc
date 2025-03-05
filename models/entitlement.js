// models/entitlement.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Entitlement = sequelize.define('Entitlement', {
  entitlementName: { type: DataTypes.STRING, allowNull: false, unique: true },
  application: { type: DataTypes.STRING, allowNull: false },
  attribute: { type: DataTypes.STRING, allowNull: false },
  value: { type: DataTypes.STRING, allowNull: false },
  displayName: { type: DataTypes.STRING, allowNull: false },
  iiqElevatedAccess: { type: DataTypes.BOOLEAN, defaultValue: false },
  owner: { type: DataTypes.STRING, allowNull: false },
  requestable: { type: DataTypes.BOOLEAN, defaultValue: true },
  classifications: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Entitlement;
