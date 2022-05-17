const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = require('./comment.model');

const Post = require('./post.model');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    profilePicture: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(User, { onDelete: 'CASCADE' });

User.hasMany(Post, { onDelete: 'CASCADE' });
Post.belongsTo(User, { onDelete: 'CASCADE' });

Post.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(Post, { onDelete: 'CASCADE' });

sequelize.sync();

module.exports = User;
