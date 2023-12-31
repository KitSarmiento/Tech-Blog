const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./User");

class BlogPost extends Model {}

BlogPost.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: "blogPost",
});

module.exports = BlogPost;
