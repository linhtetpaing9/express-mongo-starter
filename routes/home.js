
const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { message: 'Hello', title: 'My Express App'})
})

router.get('/favicon.ico', (req, res) => res.status(204));

module.exports = router;
