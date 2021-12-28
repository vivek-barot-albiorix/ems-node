const express = require("express");
require("./config/mongo");
const User = require("./app/models/user");

const app = express();
const http = require("http");
const server = http.createServer(app);
const methodOverride = require("method-override");
const port = process.env.PORT || 3000;

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  next();
});

app.use(methodOverride("_method"));
app.use(
  express.json({
    limit: "1gb",
  })
);
app.use(
  express.urlencoded({
    limit: "1gb",
    extended: true,
  })
);
app.use((err, req, res, next) => {
  if (err) {
    res.status(resStatusCode.error.internalServerError).json({
      error: req.t("ERROR"),
    });
  }
  next();
});
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});
server.listen(port, () => {
  console.log("server is up on port: " + port);
});
