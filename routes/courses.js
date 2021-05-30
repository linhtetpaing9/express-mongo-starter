const express = require('express');
const router = express.Router();

const courses = [
  {
    id: 1,
    name: 'Javascript'
  },
  {
    id: 2,
    name: 'React JS'
  },
  {
    id: 3,
    name: 'Python'
  },
];

router.get('/', (req, res) => {
  res.send(courses)
})

router.post('/', (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const course = {
    id: courses.length + 1,
    // need to add express.json() middleware
    name: req.body.name
  }
  courses.push(course);
  res.send(course);
})

router.put('/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id))
  if (!course) {
    return res.status(404).send(`Course of the given id ${req.params.id} doesn't found`)
  }

  const { error } = validateCourse(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  course.name = req.body.name;
  res.send(course);
})

router.get('/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id))
  if (!course) {
    return res.status(404).send(`Course of the given id ${req.params.id} doesn't found`)
  }
  res.send(course)
});

router.delete('/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id))
  if (!course) {
    return res.status(404).send(`Course of the given id ${req.params.id} doesn't found`)
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
})

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  }

  return Joi.validate(course, schema)
}

module.exports = router;