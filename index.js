const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const app = express();

const courses = require('./routes/courses');
const genres = require('./routes/genres');
const home = require('./routes/home');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
// route
app.use('/api/courses', courses);
app.use('/api/genres', genres);
app.use('/', home);

app.set('view engine', 'pug');
app.set('views', './views') // default

// process.env.NODE_ENV
if (app.get('env') === 'development') {
  app.use(logger);
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...')
}

dbDebugger("Database debugger...")
console.log('Application Name: ' + config.get('name'));
console.log('Application Name: ' + config.get('mail.host'));
console.log('Application Name: ' + config.get('mail.password'));

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

