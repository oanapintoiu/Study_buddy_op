const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find({ group: req.query.group })
      .populate("user")
      .exec(async (err, posts) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ posts: posts, token: token });
      });
  },
  Create: (req, res) => {
    console.log(req.body);
    const post = new Post(req.body);
    post.group = req.body.group;
    post.ai_question = req.body.ai_question;
    post.ai_response = req.body.ai_response;
    post.save(async (err) => {
      if (err) {
        ac;
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },
};

module.exports = PostsController;
