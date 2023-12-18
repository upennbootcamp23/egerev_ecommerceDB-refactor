const router = require('express').Router();
const { Tag, Product, ProductTag} = require('../../models');

//Getting all tags
router.get('/', async(req, res) => {
  try {
    let tags = await Tag.findAll({
      fields: ['id'], 
      include: [{model: Product, through: Tag}]
    });

    res.status(200).json(tags);

  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  };
});

//getting a tag through ID
router.get('/:id', async(req, res) => {
  try {
    let tags = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: Tag}]
    });

    if (!tags) {
      res.status(404).json({message: "Error 404 - No Tag Found for ID " + req.params.id});
      return;
    }
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error);

    console.log(error);
  };
});

//Creating a tag
router.post('/', async (req, res) => {
  try {
    let tag = await Tag.create(req.body);

    res.status(200).json(tag);

    } catch (error) {
    console.log(error);

    res.status(500).json(error);
  };
});

//Updating a tag
router.put('/:id', async (req, res) => {
  try {
    const updateATag = await Tag.update(req.body, {
      where: { id: req.params.id,}
    });
    res.status(200).json(updateATag);

  } 
  
  catch(error) {
    console.log(error);
    
    res.status(500).json(error);
  };
});

//Deleting a tag
router.delete('/:id', async(req, res) => {
  try {
    let tags = await Tag.destroy({
      where: {id: req.params.id}
    });

    if (!tags) {
      res.status(400).json({message: "No Tag with this ID not found"});

      return;
    } 
    res.status(200).json(tags);
    
  } catch (error) {
    res.status(500).json(error);
  };
});

//export files
module.exports = router;
