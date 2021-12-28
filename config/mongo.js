// const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/ems", {
//   useNewUrlParser: true,
// });

// imports
const mongoose = require("mongoose");

const URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/ems";

module.exports = {
  connection: mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Conneted!");
    })
    .catch((err) => {
      console.log("Error in Database connetion::", err);
      process.exit();
    }),
};
