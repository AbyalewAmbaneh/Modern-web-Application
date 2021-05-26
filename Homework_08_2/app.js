require("./api/data/db");
const express = require("express");
const app = express();
const routes = require("./api/routes");
const path = require("path");
require("./api/data/players.model");

app.set("port", 5000);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "/node_modules")));

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});
app.use("/api", routes);

const server = app.listen(app.get("port"), function () {
  const port = server.address().port;
  console.log("listening to port ", port);
});
