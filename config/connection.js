require('dotenv').config();  

let Sequelize = require('sequelize');

let sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
   {
     host: 'localhost',
     dialect: 'mysql'
   }
 );

module.exports = sequelize;
