const express = require("express");
const path = require("path");

const app = express();

app.set("port", 5000);

const server = app.listen(app.get("port"), function () {
  console.log("Listening to port " + app.get("port"));
});

app.get("/:num1", function (req, res) {
  var num2 = 0;
  console.log(req.query);
  console.log(req.params);
  if (req.query && req.query.num2) {
    num2 = parseInt(req.query.num2);
  }
  const num1 = parseInt(req.params.num1);
  const sum = num1 + num2;
  console.log(sum);
  res.json(sum);
});
