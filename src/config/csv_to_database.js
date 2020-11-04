const fs = require("fs");
const path = require("path");
const CsvReadableStream = require("csv-reader");
const crypto = require("crypto");
const Contact = require("../app/schemas/Contacts");

const parseToMongo = (file) => {
  console.log("CSV received");

  const inputStream = fs.createReadStream(file, "utf8");

  const hash = crypto.randomBytes(16);
  const newPath = `${path.resolve(
    __dirname,
    "..",
    "..",
    "tmp",
    "csv_readied"
  )}/${Date.now()}-${hash.toString("hex")}.csv`;

  inputStream
    .pipe(
      new CsvReadableStream({
        skipHeader: true,
        parseNumbers: true,
        parseBooleans: true,
        trim: true,
        delimiter: "\t",
      })
    )
    .on("data", async function (row) {
      try {
        const contact = new Contact({
          name: row[1],
          phone: row[0],
        });

        await contact.save();
      } catch (error) {}
    })
    .on("end", function (data) {
      console.log("CSV ok");
      fs.rename(file, newPath, function (err) {
        if (err) throw err;
        console.log("CSV moved to a new directory");
      });
    });
};

module.exports = {
  parseToMongo,
};
