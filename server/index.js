const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/", (req, res) => {
  pool
    .query("SELECT * from tasklist")
    .then((sql) => {
      res.json({
        tasklist: sql.rows,
      });
    })
    .catch((e) => {
      console.error(e.stack);
      res.sendStatus(500);
    });
});

app.post("/", (req, res) => {
  pool
    .query("INSERT INTO tasklist(task) VALUES($1)", [req.body.task])
    .catch((e) => {
      console.error(e.stack);
      res.sendStatus(500);
    })
    .finally(() => {
      res.send();
    });
});

app.delete("/:id", (req, res) => {
  pool
    .query("DELETE FROM tasklist WHERE id = $1", [req.params.id])
    .catch((e) => {
      console.error(e.stack);
      res.sendStatus(500);
    })
    .finally(() => {
      res.send();
    });
});

app.listen(4000, () => {
  console.log("running on port 4000");
});
