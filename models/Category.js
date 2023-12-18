// import eveything necessary for the products to "communicate" with the database
const { Model, DataTypes } = require('sequelize');
let sequelize = require('../config/connection.js');

//Activating the class
class Category extends Model {}

Category.init(
  {
    //id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    //category_name column
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
