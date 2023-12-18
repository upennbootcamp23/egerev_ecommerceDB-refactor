const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// get all products
router.get('/', async (req, res) => {
  // find all products with associated Category and Tag data
  try{
    let products = await Product.findAll({
      fields: ['id'],
      include: [{model: Category}, {model: Tag, through: ProductTag}]
    });

    res.status(200).json(products);

  } catch(error) {
    console.log(error);

    res.status(500).json(error);
  }
});

// get product by ID
router.get('/:id', async (req, res) => {
  try {
    let products = await Product.findByPk(req.params.id, {
      include: [{model: Category}, {model: Tag, through: ProductTag}]
    });
    if(!products) {
      res.status(404).json({message: "Error 404 - Product Not Found"});
      return;
    }
    res.status(200).json(products);
  } catch(error) {
    res.status(500).json(error);
  }
});

// How to create a new product
router.post('/', (req, res) => {
  /* 
    "How it's supposed to be" - that didn't work when testing. 
    Therefore, this is the answer:
  */
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    arr_tag_ids: req.body.arr_tag_ids
  })
    .then((product, arr_tag_ids) => {

      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.arr_tag_ids != undefined) {   
      if (req.body.arr_tag_ids.length > 0) {
        var arrTagIDs = [];

        for (id of req.body.arr_tag_ids) {
          var objRow = {};
          objRow["product_id"] = product.id;
          objRow["tag_id"] = id;
          arrTagIDs.push(objRow);
        }

        return ProductTag.bulkCreate(arrTagIDs);
      }
    }

      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product by ID
router.put('/:id', (req, res) => {
  
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {

          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);

          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
    
});

//delete product by ID
router.delete('/:id', async(req, res) => {
  try {
    let products = await Product.destroy({
      where: {id: req.params.id}
    });
    if(!products) {
      res.status(404).json({message: "Error 404 - No Product Found For ID " + req.params.id});
      return;
    }
    res.status(200).json(products);
  } catch(error) {
    res.status(500).json(error);
  }
});

//export files
module.exports = router;
