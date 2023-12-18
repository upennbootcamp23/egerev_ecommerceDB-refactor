//requiring the files
const express = require('express');
const routes = require('./routes');
let sequelize = require('./config/connection')
const app = express();
const PORT = 3001; 

//using the apps
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//authenticating the database
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

//if successful, use routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
  });
});
