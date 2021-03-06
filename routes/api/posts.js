const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// Private post route
//Post a new post

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],

  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    try {
      const user = await User.findById(req.user.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//Get all posts
//private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//Get posts by ID
//private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.json(post);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//Delete Post by ID
//private

router.delete("/:id", auth, async (req, res) => {
  try {
    //check that post belongs to user

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    //Check user
    if (post.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    } else {
      await post.remove();

      res.json({ message: "Post removed" });
    }
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//Like a Post
//private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    let match = 0;

    //check if post hasn't been liked
    for (let key in post.likes) {
      // console.log(post.likes[key])
      if (post.likes[key].user.toString() === req.user.user.id) {
        match++;
      }
    }
    if (match > 0) {
      return res.status(400).json({ message: "Post already liked" });
    } else {
      post.likes.unshift({ user: req.user.user.id });
      await post.save();
      res.json(post.likes);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//Unlike a Post
//private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    let match = 0;

    //check if post hasn't been liked
    for (let key in post.likes) {
      if (post.likes[key].user.toString() === req.user.user.id) {
        match++;
      }
    }
    if (match === 0) {
      return res.status(400).json({ message: "Post has not been liked" });
    } else {
      //getting the index of the like by user
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.user.id);
      post.likes.splice(removeIndex, 1);
      await post.save();
      res.json({ msg: "Post unliked" });
      console.log(post.likes);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//POST api/posts/comment/:id
// Comment on a Post
//Private

router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],

  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    try {
      const user = await User.findById(req.user.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//DELETE api/posts/comment/:id/:comment_id
// Delete comment
//Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    //get post by ID
    const post = await Post.findById(req.params.id);

    //Loop through comments and find the index of the comment
    let comment = post.comments.map((item) => {
      return item.id;
    });

    //find index of the comment
    let index = comment.indexOf(req.params.comment_id);

    let user = post.comments.map((item) => {
      return item.user;
    });

    if (!comment[index]) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    // // Check that who deletes the comment is the author
    if (user[index].toString() !== req.user.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    //remove comment from the list
    post.comments.splice(index, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
