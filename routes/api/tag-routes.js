const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tag = await Tag.findAll({
    include: [{model:Product}]
  })
  res.status(200).send(tag)
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tag = await Tag.findByPk(req.params.id, {
    include: [{model:Product}]
  })
  if (!tag){
    res.status(400).send('No such ID.')
    return
  }
  res.status(200).send(tag)
});

router.post('/', async (req, res) => {
  // create a new tag
  const tag = req.body.tag_name

  await Tag.create({
    tag_name: tag
  })
  res.status(201).send(`Successfully created the '${req.body.tag_name}' tag.`)
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tag = await Tag.findByPk(req.params.id)
  const oldTag = tag.dataValues.tag_name
  await Tag.update(
    {tag_name: req.body.tag_name},
    {
      where: {
        id: req.params.id
      }
    }
  )

  res.status(200).send(`Successfully updated the '${oldTag}' tag to the '${req.body.tag_name}' tag using ID: ${req.params.id}.` )
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
const tag = await Tag.findByPk(req.params.id)
const oldTag = tag.dataValues.tag_name
 const del = await Tag.destroy({
    where: {
      id: req.params.id
    }
  })

  if (del === 0){
    res.status(400).send(`There is no tag with the ID '${req.params.id}'.`)
    return
  }

  res.status(200).send(`${del} tag(s) deleted (${oldTag}).`)
});

module.exports = router;
