const { Router } = require("express");
const {
  getPosts,
  setPost,
  modifyPost,
  deletePost,
} = require("../controller/postController");

const postRouter = Router();

postRouter.route("/").get(getPosts);
postRouter.route("/").post(setPost);
postRouter.route("/update/:id").put(modifyPost);
postRouter.route("/delete/:id").delete(deletePost);

module.exports = postRouter;
