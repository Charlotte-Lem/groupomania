const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define(
  'post',
  {
    postId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: { type: DataTypes.TEXT },
    imagePost: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
  }
);

sequelize.sync();
module.exports = Post;
