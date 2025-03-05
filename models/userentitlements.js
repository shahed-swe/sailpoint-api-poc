// models/userEntitlement.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./user');
const Entitlement = require('./entitlement');

const UserEntitlement = sequelize.define('UserEntitlement', {
  UserId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  EntitlementId: { type: DataTypes.INTEGER, references: { model: Entitlement, key: 'id' } }
});

User.belongsToMany(Entitlement, { through: UserEntitlement });
Entitlement.belongsToMany(User, { through: UserEntitlement });

module.exports = UserEntitlement;
