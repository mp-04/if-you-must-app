const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const listController = require("./controller");
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));

//define routes to forward requests
app.get("/", listController.getUrls, (req, res) => {
  return res.json(res.locals);
});

app.post(
  "/submit",
  listController.addUrls,
  listController.getUrls,
  (req, res) => {
    return res.sendStatus(200);
  }
);

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});

module.exports = app;
