// import eveything necessary for the products to "communicate" with the database
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

//Activating the class
class Tag extends Model {}

Tag.init(
  {
    // id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    //tag_name column
    tag_name: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
