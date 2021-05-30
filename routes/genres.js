const express = require('express');
const router = express.Router();

// Read
router.get('/', (req, res) => {
  res.send(genres)
})

// Read
router.get('/:id', (req, res) => {
  const genre = genres.find(genre => genre.id == parseInt(req.params.id))
  if (!genre) return res.status(404).send("Given ID doesn't exist")
  res.send(genre)
})

// Create
router.post('/', (req, res) => {
  // validation

  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].name)

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  }

  genres.push(genre)
  res.send(genres)
})

// Delete
router.delete('/:id', (req, res) => {
  const genre = genres.find(genre => genre.id == parseInt(req.params.id))
  if (!genre) return res.status(404).send("Given ID doesn't exist")

  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].name)

  const index = genres.indexOf(genre)

  genres.splice(index, 1);
  res.send(genre);
})

// Update
router.put('/:id', (req, res) => {
  const genre = genres.find(genre => genre.id == parseInt(req.params.id))
  if (!genre) return res.status(404).send("Given ID doesn't exist")

  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].name)

  genre.name = req.body.name

  res.send(genre);
})

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  }

  return Joi.validate(genre, schema)
}

module.exports = router;
