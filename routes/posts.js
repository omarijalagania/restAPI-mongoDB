const express = require("express");
const router = express.Router();

const Posts = require("../models/posts");

//get All Posts from Database
router.get("/", (req, res) => {
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

module.exports = router;
