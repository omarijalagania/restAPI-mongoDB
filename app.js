const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

require("dotenv").config();

const bodyParser = require("body-parser");
const connectDB = require("./config/db");
//body parser middleware
app.use(bodyParser.json());

//import posts routes
const postRouter = require("./routes/posts");

//import auth routes

const authRouter = require("./routes/auth");

//import Totos routes

const todosRouter = require("./routes/todos");

//import Tinder routes

const tinderRouter = require("./routes/tinder");

//Uber routes

const UberRoutes = require("./routes/uber");

//auth Middleware
app.use("/api/user", authRouter);

//use routes
app.use("/posts", postRouter);

app.use("/", todosRouter);

//tinder

app.use("/api/tinder", tinderRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

//uber

app.use("/api/", UberRoutes);

//DB Connection
connectDB();

//Listening to port 5000
app.listen(8080);
