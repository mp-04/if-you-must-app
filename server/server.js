const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const listController = require('./controller')

app.use(express.static('client'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//define routes to forward requests
// app.get('/', listController.getUrls, (req, res) => {
//   console.log('get:' + res.locals.urls)
//   return res.status(200).json(res.locals.urls);
// })

app.post('/submit', listController.addUrls, listController.getUrls, (req, res) => {
  // res.sendFile(path.resolve(__dirname, '../client/index.html'))
  // res.send('received and processing');
  // console.log(req.body);
  console.log('post:' + res.locals.urls)
  return res.status(200).json(res.locals.urls);
})

app.listen(port, () => {
  console.log(`Server running at port: ${port}/`)
})

module.exports = app;