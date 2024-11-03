const { Router } = require("express");
const {
  setAddress,
  modifyAddress,
  getOneAddress,
} = require("../controller/addressController");
const { authenticate } = require("../middleware/authenticate");

const addressRouter = Router();

addressRouter.route("/:id").get(authenticate, getOneAddress);
addressRouter.route("/create").post(authenticate, setAddress);
addressRouter.route("/update/:id").put(authenticate, modifyAddress);

module.exports = addressRouter;
