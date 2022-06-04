const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const fileUpload = require("./utils/image-upload")
app.use(cors())

require("dotenv").config()
app.use("/images", express.static(path.join(__dirname, "images")))

const bodyParser = require("body-parser")
const connectDB = require("./config/db")
//body parser middleware
app.use(bodyParser.json())
app.use(fileUpload.upload.single("image"))

//import posts routes
const postRouter = require("./routes/posts")

//import auth routes

const authRouter = require("./routes/auth")

//import Totos routes

const todosRouter = require("./routes/todos")

//import Tinder routes

const tinderRouter = require("./routes/tinder")

//Uber routes

const UberRoutes = require("./routes/uber")

const Docs = require("./routes/doc")

const feedRoute = require("./routes/feed")

//auth Middleware
app.use("/api/user", authRouter)

//use routes
app.use("/posts", postRouter)

app.use("/", todosRouter)
app.use("/apiv2", feedRoute)
//tinder

app.use("/api/tinder", tinderRouter)

app.use("/", Docs)

app.get("/", (req, res) => {
  res.send("Hello World")
})

//uber

app.use("/api/", UberRoutes)

//DB Connection
connectDB()

//Listening to port 5000
app.listen(8080)
