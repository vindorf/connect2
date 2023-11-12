const mongoose = require("mongoose");
const User = require("./models/app.mod");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();

app.set("view engine", "hbs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "index")));
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("mongodb://127.0.0.1:27017/data-data")
  .then((x) => {
    console.log(`connected to ${x.connection.name}`);
  })
  .catch((er) => console.error("connection to " + er + "failed"));



app.get("/", (req, res) => {
  const userName = req.query.userName;

  if (userName) {
    User.find({ name: { $regex: new RegExp(userName, "i") } })
      .then((result) => {
        res.render("index", { users: result, userName });
      })
      .catch((error) => {
        console.error("Fehler bei der MongoDB-Suchanfrage:", error);

        res.status(500).send("Interner Serverfehler");
      });
  } else {
    res.render("index", { userName });
  }
});

app.listen(3000, () => {
  console.log("servus");
});