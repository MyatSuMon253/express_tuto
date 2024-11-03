const { Router } = require("express");
const { register, login, logout } = require("../controller/userController");
const { authenticate } = require("../middleware/authenticate");

const userRouter = Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(authenticate, logout);

module.exports = userRouter;
