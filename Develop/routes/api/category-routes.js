const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
    Category.findAll().then((categoryData) => {
      res.json(categoryData);
    });
  });

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id','category_name'],
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
   // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
   Category.create({
    id: req.body.category_id,
    category_name: req.body.category_name
  }).then(() => {
    return Category.findOne({
      where: {
        id: req.body.category_id
      },
      attributes: [
        'id',
        'category_name'
      ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  });
});
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.create({
    id: req.body.category_id,
    category_name: req.body.category_name
  }).then(() => {
    return Category.findOne({
      where: {
        id: req.body.category_id
      },
      attributes: [
        'id',
        'category_name'
      ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  });
});
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const sql = `DELETE FROM categories WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'categories not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});


module.exports = router;
