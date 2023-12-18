// import eveything necessary for the products to "communicate" with the database
const { Model, DataTypes } = require('sequelize');
let sequelize = require('../config/connection');

//Activating the class
class Product extends Model {}

Product.init(
  {
    //the id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    //the product_name column
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    //the price column
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },

    //the stock column
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
    },

    //the category_id column
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
