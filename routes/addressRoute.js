const { Router } = require("express");
const { setAddress } = require("../controller/addressController");

const addressRouter = Router();

addressRouter.route("/create").get(setAddress);

module.exports = addressRouter;
