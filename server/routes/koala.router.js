const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION

// GET
// send back all koalas from DB
koalaRouter.get('/', (req, res) => {
  const queryText = `SELECT * FROM "koalas" ORDER BY "id" ASC;`;

  pool
    .query(queryText)
    .then((koalasResponse) => {
      res.send(koalasResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// POST
// Save new koala to DB
koalaRouter.post('/', (req, res) => {
  res.sendStatus(201);
});

// PUT

// DELETE

module.exports = koalaRouter;
