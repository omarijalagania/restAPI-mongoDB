const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const fileUpload = require("./utils/image-upload")
app.use(cors())
const { Server } = require("socket.io")

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

const server = app.listen(8080)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
})

io.on("connection", (socket) => {
  console.log(socket.id)

  socket.on("join", (data) => {
    socket.join(data)
    console.log(`user with id ${data} joined`)
  })

  socket.on("send_message", (data) => {
    console.log(data)
    socket.to(data.room).emit("receive_message", data)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected")
  })
})
