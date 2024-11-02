const { Router } = require("express");
const { register } = require("../controller/userController");

const userRouter = Router();

userRouter.route("/").post(register);

module.exports = userRouter;
