const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(categories);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const singleCategory = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  });
  if (!singleCategory) {
    res.status(400).send("No category found with that id");
    return;
  }
  res.status(200).json(singleCategory);
});

router.post("/", async (req, res) => {
  // create a new category
  const newCategory = await Category.create({
    category_name: req.body.category_name,
  });
  req.status(201).send(`Category ${newCategory.category_name} created`);
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const category = await Category.findByPk(req.params.id);
  const oldCategory = category.dataVales.category_name;
  await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res
    .status(200)
    .send(`Category ${oldCategory} updated to ${req.body.category_name}`);
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const category = await Category.findByPk(req.params.id);
  const oldCategory = category.dataValues.category_name;
  const del = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (del === 0) {
    res.status(400).send(`No category found with id ${req.params.id}`);
  }
  res.status(200).send(`Category ${oldCategory} deleted`);
});

module.exports = router;
