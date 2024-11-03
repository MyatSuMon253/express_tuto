const { Router } = require("express");
const {
  setAddress,
  modifyAddress,
  getOneAddress,
  getAddress,
} = require("../controller/addressController");
const { authenticate } = require("../middleware/authenticate");

const addressRouter = Router();

addressRouter.route("/").get(authenticate, getAddress);
addressRouter.route("/:id").get(authenticate, getOneAddress);
addressRouter.route("/create").post(authenticate, setAddress);
addressRouter.route("/update/:id").put(authenticate, modifyAddress);

module.exports = addressRouter;
