const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Likes = sequelize.define('Likes');

sequelize.sync();

module.exports = Likes;
