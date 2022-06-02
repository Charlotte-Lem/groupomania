const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Likes = sequelize.define('Likes');
// Likes.associate = function (models) {
//     Likes.belongsTo(models.User, {
//       foreignKey: 'UserId',
//       as: 'User',
//     });
//     Likes.belongsTo(models.Posts, {
//       foreignKey: 'PostId',
//       as: 'Post',
//     });
//   };
sequelize.sync();

module.exports = Likes;
