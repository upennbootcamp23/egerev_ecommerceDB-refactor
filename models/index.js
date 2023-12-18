// import models
let Product = require('./Product');
let Category = require('./Category');
let Tag = require('./Tag');
let ProductTag = require('./ProductTag');

//Association between Product and Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

//Association of Category and Products
Category.hasMany(Product, {
});

//Association between Products and Tags (via ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
  }
});

//Association between Tags and Products (via ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
  }
});

//Exporting files
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
