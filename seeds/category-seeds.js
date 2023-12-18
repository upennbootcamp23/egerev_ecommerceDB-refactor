//requiring files
const { Category } = require('../models');

//creating categories
const categories = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];

//sending seeds out
const seedCategories = () => Category.bulkCreate(categories);

//exporting files
module.exports = seedCategories;

