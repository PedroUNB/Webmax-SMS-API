require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
const chokidar = require("chokidar");
const path = require("path");
const express = require("express");
const morgan = require("morgan");

const { smsSchedule } = require("../src/schedules/smsSchedule");

const { parseToMongo } = require("./config/csv_to_database");

const watcher = chokidar.watch(
  path.resolve(__dirname, "..", "tmp", "uploads"),
  { ignored: /^\./, persistent: true }
);

class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(morgan("tiny"));
    smsSchedule();
    watcher
      .on("add", function (file) {
        parseToMongo(file);
      })
      .on("change", function () {
        console.log("File", "has been changed");
      })
      .on("unlink", function () {
        console.log("File", "has been removed");
      })
      .on("error", function (error) {
        console.error("Error happened", error);
      });
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new AppController().express;
