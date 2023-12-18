//files required for everything to work
const router = require('express').Router();
const { Category, Product } = require('../../models');

//get all categories
router.get('/', async (req, res) => {
  // find all categories with its associated Products
  try {
    let categoryValues = await Category.findAll({
      fields: ['id'],
      include:[{model: Product, through: Category.id}]
    });

    res.status(200).json(categoryValues);
    
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
});

//get category(ies) by ID
router.get('/:id', async(req, res) => {
  // find a category by ID with its associated Products 
  try {
    let categoryValues = await Category.findByPk(req.params.id, {
      include:[{model: Product, through: Category.id}]
    });
    if(!categoryValues) {
      res.status(404).json({message: "Error 404 - No Category Found for ID " + req.params.id});
      return;
    } 
      res.status(200).json(categoryValues);
    } catch(error) {
      res.status(500).json(error);
    };
});

//How to create a post for categories
router.post('/', async (req, res) => {
    try {
    let category = await Category.create(req.body);
    
    res.status(200).json(category);
  } catch(error) {
    res.status(500).json(error);
  };
});

//Updating Category through ID value
router.put('/:id', async (req, res) => {
  try {
    let categoryUpdate = await Category.update(req.body, {
      where: {id: req.params.id,}
    });
    res.status(200).json(categoryUpdate);
  } catch (error) {
    res.status(500).json(error);
  };
});

//Deleting Category by ID value
router.delete('/:id', async (req, res) => {
  try {
    let category = await Category.destroy({
      where: { id: req.params.id}
    });
    if(!category) {
      res.status(404).json({message: "Cannot find any categories with this ID."});
      return;
    }
    res.status(200).json(category);
  } catch(error) {
    res.status(500).json(error);
  }
});

//exporting file
module.exports = router;
