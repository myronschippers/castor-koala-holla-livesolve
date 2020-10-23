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
  // {
  //   name: 'testName',
  //   age: 'testName',
  //   gender: 'testName',
  //   readyForTransfer: 'testName',
  //   notes: 'testName',
  // }
  const newKoala = req.body;
  const queryText = `INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
  VALUES ($1, $2, $3, $4, $5);`;
  const queryDataList = [
    newKoala.name,
    newKoala.gender,
    newKoala.age,
    newKoala.readyForTransfer,
    newKoala.notes,
  ];

  pool
    .query(queryText, queryDataList)
    .then((koalasResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// PUT

// DELETE

module.exports = koalaRouter;
