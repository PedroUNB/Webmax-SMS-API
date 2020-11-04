const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/noderest", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("error");
  });
mongoose.Promise = global.Promise;

module.exports = mongoose;
