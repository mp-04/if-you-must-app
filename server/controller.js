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
      const promises = [];
      response.rows.forEach((row, index) => {
        res.locals.info.push({
          displayUrl: row.url,
        });
        promises.push(
          getLinkPreview(row.url, {
            followRedirects: "follow",
          }).then((result) => {
            res.locals.info[index].image = result.images[0];
          })
        );
      });
      return Promise.all(promises);
    })
    .then(() => next())
    // response.rows.forEach((row, index) => {
    //   res.locals.info.push({
    //     displayUrl: row.url,
    //   });
    //   const getPromise = async () => {
    //     const result = await getLinkPreview(row.url);
    //     res.locals.info[index].image = result.images[0];
    //     return;
    //   };
    //   getPromise();
    // });
    // return next();
    // setTimeout(() => {
    //   return next();
    // }, 1000);

    // console.log("reso", response);
    // res.locals.getUrls = response.rows;
    // // console.log("reslocals", res.locals);
    // res.locals.getUrls.forEach((data) => {
    //   getLinkPreview(data.url).then((data) => {
    //     console.log(data);
    //   });
    // });
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
