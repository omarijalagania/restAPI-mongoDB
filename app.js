const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

//Routes

app.get("/", (req, res) => {
  res.send("Working!!!");
});

//DB Connect

mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("Connected to DB");
});

//Listening to port 5000
app.listen(8080);
