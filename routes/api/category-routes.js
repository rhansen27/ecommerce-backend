const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const categories = await Category.findAll({
    include: [{model: Product}]
  })
  res.status(200).send(categories)
});

router.get('/:id', async (req, res) => {
 
  const singleCategory = await Category.findByPk(req.params.id, {
    include: [{model: Product}]
  })
  if (!singleCategory){
    res.status(400).send('No such ID.')
    return
  }
  res.status(200).send(singleCategory)
});

router.post('/', async (req, res) => {
  const newCategory = await Category.create(
    {
      category_name: req.body.category_name
    }
  )
  res.status(201).send(`Successfully created the '${req.body.category_name}' category.`)
});

router.put('/:id', async (req, res) => {
  const category = await Category.findByPk(req.params.id)
  const oldCategory = category.dataValues.category_name
  await Category.update(
    {category_name: req.body.category_name},
    {
      where: {
        id: req.params.id
      }
    }
  )

  res.status(200).send(`Successfully updated the '${oldCategory}' category to the '${req.body.category_name}' category using ID: ${req.params.id}.` )
  
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
const category = await Category.findByPk(req.params.id)
const oldCategory = category.dataValues.category_name
 const del = await Category.destroy({
    where: {
      id: req.params.id
    }
  })

  if (del === 0){
    res.status(400).send(`There is no category with the ID '${req.params.id}'.`)
    return
  }

  res.status(200).send(`${del} categories deleted (${oldCategory}).`)

});

module.exports = router;
