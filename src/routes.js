const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const CsvController = require("./app/controllers/CsvController");

routes.get("/", (req, res) => {
  res.status(200).send();
});

routes.post("/csv", multer(multerConfig).single("file"), CsvController.store);

module.exports = routes;
