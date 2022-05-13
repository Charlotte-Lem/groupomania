const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define(
  'comments',
  {
    commentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    message: { type: DataTypes.TEXT },
    userId: {
      type: DataTypes.INTEGER,
      required: true,
    },
  },

  {
    freezeTableName: true,
    timestamps: false,
  }
);

sequelize.sync({});

module.exports = Comment;
