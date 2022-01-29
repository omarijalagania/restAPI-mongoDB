const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//body parser middleware
app.use(bodyParser.json());

//import routes
const postRouter = require("./routes/posts");

//use routes
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

//DB Connection
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("Connected to DB");
});

//Listening to port 5000
app.listen(8080);
