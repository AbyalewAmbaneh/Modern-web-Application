require("./api/data/db"); /// must be here
const express = require("express");
const app = express();
const routes = require("./api/routes");

//require("./api/data/games.model");
require("./api/data/student.model");

app.set("port", 5000);

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use("/api", routes);

const server = app.listen(app.get("port"), function () {
  const port = server.address().port;
  console.log("Listening to port", port);
});
