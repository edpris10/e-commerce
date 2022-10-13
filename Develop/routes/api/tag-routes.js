const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll().then((tagData) => {
    res.json(tagData);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id','tag_name'],
    include: [
      {
        model: Tag,
        attributes: ['id', 'tag_name']
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
  // create a new tag
  Tag.create({
    id: req.body.tag_id,
    tag_name: req.body.tag_name
  }).then(() => {
    return Tag.findOne({
      where: {
        id: req.body.category_id
      },
      attributes: [
        'id',
        'tag_name'
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
  // update a tag's name by its `id` value
  Tag.create({
    id: req.body.tag_id,
    tag_name: req.body.tag_name
  }).then(() => {
    return Tag.findOne({
      where: {
        id: req.body.tag_id
      },
      attributes: [
        'id',
        'tag_name'
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
  // delete on tag by its `id` value
  const sql = `DELETE FROM tag WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'tag not found'
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
