require("./api/data/db");
const express = require("express");
const app = express();
const routes = require("./api/routes");

require("./api/data/players.model");

app.set("port", 5000);

app.use(express.json());
app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});
app.use("/api", routes);

const server = app.listen(app.get("port"), function () {
  const port = server.address().port;
  console.log("listening to port ", port);
});
