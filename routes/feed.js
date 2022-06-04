const express = require("express")
const router = express.Router()
const getPosts = require("../controllers/feed")
//get All Posts from Database
router.get("/my-posts", getPosts.getPosts)

//Put Posts to Database
router.post("/set-post", getPosts.setPosts)

module.exports = router
