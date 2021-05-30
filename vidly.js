const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());


const genres = [
  {
    id: 1,
    name: 'Action'
  },
  {
    id: 2,
    name: 'Horror'
  },
  {
    id: 3,
    name: 'Drama'
  },
]

app.get('/', (req, res) => {
  res.send('Welcome from vidly...')
})



const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})