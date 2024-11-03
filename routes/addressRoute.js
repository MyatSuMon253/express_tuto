const { Router } = require("express");
const {
  setAddress,
  modifyAddress,
} = require("../controller/addressController");

const addressRouter = Router();

addressRouter.route("/create").post(setAddress);
addressRouter.route("/update/:id").put(modifyAddress);

module.exports = addressRouter;
