const Feed = require("../models/Feed")

exports.getPosts = async (req, res) => {
  const feed = await Feed.find()
  res.json({
    message: "Posts fetched successfully",
    posts: feed,
  })
}

exports.setPosts = async (req, res, next) => {
  let imageUrl = req.file.path

  const data = {
    name: req.body.name,
    lastname: req.body.lastname,
    image: imageUrl,
  }
  const newPost = await new Feed({
    name: data.name,
    lastname: data.lastname,
    image: data.image,
  })
  newPost.save()
  res.status(200).json({
    message: "Post added successfully",
    post: data,
  })
}
