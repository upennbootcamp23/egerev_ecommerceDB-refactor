const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('sequelize.sync Done.\n');

  await seedCategories();
  console.log('seedCategories Done.\n');

  await seedProducts();
  console.log('seedProducts Done.\n');

  await seedTags();
  console.log('seedTags Done.\n');

  await seedProductTags();
  console.log('seedProductTags Done.\n');

  process.exit(0);
};

seedAll();
