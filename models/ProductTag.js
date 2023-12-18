// import eveything necessary for the products to "communicate" with the database
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Activating the class
class ProductTag extends Model {}

ProductTag.init(
  {
    // id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    //product_id column
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key:'id' 
      }
    },

    //tag_id column (since the association between Tag and Product is via ProductTag)
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
