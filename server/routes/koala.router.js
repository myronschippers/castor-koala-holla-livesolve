const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION

// GET
// send back all koalas from DB
koalaRouter.get('/', (req, res) => {
  res.send('GET Hello');
});

// POST
// Save new koala to DB
koalaRouter.post('/', (req, res) => {
  res.sendStatus(201);
});

// PUT

// DELETE

module.exports = koalaRouter;
