//imports
const express = require("express");
const methodOverride = require("method-override");
const { resStatusCode } = require("../helper/constant");
require("./mongo");

const app = express();

const server = require("http").createServer(app);

// const variables
const PORT = process.env.PORT || 3000;

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, x-auth-token, x-l10n-locale, Cache-Control, timeout"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

//before request process
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(methodOverride("_method"));
app.use((err, req, res, next) => {
  if (err) {
    console.log("System Error::=>", err);
    res.status(resStatusCode.error.internalServerError).json({
      error: "ERROR",
    });
  }
  next();
});

// import routes
const router = require("../routes");

// routes
app.use("/api/v1", router);

// when no routes match
app.all("/*", (req, res) => {
  return res.status(resStatusCode.error.notFound).json({
    message: "URL_NOT_FOUND",
  });
});

// listion server
server.listen(PORT, () => {
  console.log("API server listion on PORT::", PORT);
});

module.exports = app;
