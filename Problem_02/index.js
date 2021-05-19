const express = require("express");
const path = require("path");

const app = express();

app.set("port", 5000);

const server = app.listen(app.get("port"), function () {
  console.log("Listening to port " + app.get("port"));
});

app.get("/", function (req, res) {
  console.log("File request received");
  res.status(200).sendFile(path.join(__dirname, "/public/index.html"));
});
