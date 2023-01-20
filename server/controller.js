const { rows } = require("pg/lib/defaults");
const db = require("../database/db");

const listController = {};

//update to parameterized queries

listController.addUrls = (req, res, next) => {
  const body = `${req.body.url}`;
  const addUrlQuery = `INSERT INTO url_list (url) VALUES (\'${body}\');`;

  db.query(addUrlQuery)
    .then((response) => {
      console.log("url has been added to db!");
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// middleware to retrieve URLs
listController.getUrls = (req, res, next) => {
  const getUrlQuery = "SELECT * FROM url_list ORDER BY id DESC;";
  db.query(getUrlQuery)
    .then((response) => {
      res.locals = response.rows;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// middleware to delete URLs
listController.deleteUrl = (req, res, next) => {
  const urlToDelete = req.body.deleteUrl;
  const deleteUrlQuery = `DELETE FROM url_list where url=\'${urlToDelete}\'`;
  db.query(deleteUrlQuery)
    .then((response) => {
      console.log(`${urlToDelete} has been deleted from the db!`);
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = listController;
