const express = require("express");
const router = express.Router();
//check if user is logged in
const verifyToken = require("./verifyToken");

const Posts = require("../models/Posts");

//get All Posts from Database
//restrict access to this route to only logged in users
router.get("/", verifyToken, (req, res) => {
  Posts.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => console.log(err));
});

//Add Post to Database
router.post("/", (req, res) => {
  const post = new Posts({
    title: req.body.title,
    description: req.body.description,
  });
  post
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log({ message: err });
    });
});

//Search Post by ID
router.get("/:id", (req, res) => {
  Posts.find({ _id: req.params.id })
    .then((post) => {
      res.json(post);
    })
    .catch((err) => console.log(err));
});

//Delete Post from Database
router.delete("/:id", (req, res) => {
  Posts.remove({ _id: req.params.id })
    .then((post) => {
      res.json(post);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
