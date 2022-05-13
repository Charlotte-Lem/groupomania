const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Like = sequelize.define(
  'like',
  {
    like: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

sequelize.sync();

module.exports = Like;
