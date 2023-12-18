//Importing everything needed for the function
const router = require('express').Router();
const apiRoutes = require('./api');

//Using the router for the database
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;