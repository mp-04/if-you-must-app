const { getLinkPreview } = require("link-preview-js");
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
  res.locals.info = [];
  const getUrlQuery = "SELECT * FROM url_list ORDER BY id DESC;";
  db.query(getUrlQuery)
    .then((response) => {
      response.rows.forEach((row, index) => {
        res.locals.info.push({
          displayUrl: row.url,
        });
        const getPromise = async () => {
          let promise = getLinkPreview(row.url);
          let result = await promise;
          res.locals.info[index].image = result.images[0];
          return;
        };
        getPromise();
        // const imageFromPromise = (async () => await getPromise())();
        // getLinkPreview(row.url).then((data) => {
        //   res.locals.image = data.images[0];
        // });
      });
      setTimeout(() => {
        return next();
      }, 1000);
      // return next();

      // console.log("reso", response);
      // res.locals.getUrls = response.rows;
      // // console.log("reslocals", res.locals);
      // res.locals.getUrls.forEach((data) => {
      //   getLinkPreview(data.url).then((data) => {
      //     console.log(data);
      //   });
      // });
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
