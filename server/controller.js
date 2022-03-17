const db = require('../database/db');

const listController =  {};

listController.addUrls = (req, res, next) => {
  const body = `${req.body.inputUrl}`;
  const addUrlQuery = `INSERT INTO url_list (url) VALUES (\'${body}\');`

  db.query(addUrlQuery)
  .then(response => {
    console.log('url has been added to db!')
    res.locals.urls = response.rows;
    return next();
  })
  .catch(err => {
    return next(err);
  });
  // console.log(req.body);
}

//middleware to retrieve URLs
listController.getUrls = (req, res, next) => {
  const getUrlQuery = "SELECT url FROM url_list"
  db.query(getUrlQuery)
  .then(response => {
    console.log('get' + response.rows)
    res.locals.urls = response.rows;
    return next();
  })
  .catch(err => {
    return next(err);
  })
}

//middleware to delete URLs

module.exports = listController;