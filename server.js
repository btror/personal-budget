const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nameModel = require("./models/name_schema");
const url = "mongodb://localhost:27017/personalBudget";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("", express.static("public"));
app.use(cors());


app.get("/budget", (req, res) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Successfully connected to the database");
      nameModel
        .find({})
        .then((data) => {
          console.log(data);
          res.json(data);
          mongoose.connection.close();
        })
        .catch((err) => {
          console.log(err);
        });
    });
});

app.post("/budget", (req, res) => {
  var data = {
    title: req.body.title,
    budget: req.body.budget,
    color: req.body.color
  };
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Successfully connected to the database");
      nameModel.insertMany(data, (err, data) => {
        if (err) {
          console.log(err);
          res.send(err);
          mongoose.connection.close();
        } else {
          res.send(data);
          mongoose.disconnect();
        }
      });
    });
});

app.listen(port, () => {
  console.log(`API served at https://localhost:${port}`);
});
