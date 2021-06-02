require("./api/data/db"); /// must be here
const express = require("express");
const app = express();
const routes = require("./api/routes");
const path = require("path");

require("./api/data/games.model");

app.set("port", 5000);

app.use(express.json());
app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use("/api", routes);
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

const server = app.listen(app.get("port"), function () {
  const port = server.address().port;
  console.log("Listening to port", port);
});
