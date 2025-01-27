const { Router } = require("express");
const {
  getPosts,
  setPost,
  modifyPost,
  deletePost,
  getOnePost,
} = require("../controller/postController");
const { authenticate } = require("../middleware/authenticate");

const postRouter = Router();

postRouter.route("/").get(getPosts);
postRouter.route("/:id").get(getOnePost);
postRouter.route("/").post(authenticate, setPost);
postRouter.route("/update/:id").put(modifyPost);
postRouter.route("/delete/:id").delete(deletePost);

module.exports = postRouter;
