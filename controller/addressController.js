const { ObjectId } = require("mongodb");
const { getDB } = require("../db/db");
const { BadRequest, NotFound } = require("../utils/AppError");
const { tryCatch } = require("../utils/tryCatch");

exports.setAddress = tryCatch(async (req, res, next) => {
  const db = getDB();
  const collection = db.collection("address");
  const { street, city, state } = req.body;
  if (!street || !city || !state) {
    throw new BadRequest("Please provide all required fields");
  }
  const userId = req.userId;
  const existingUser = await collection.findOne({
    userId: new ObjectId(userId),
  });
  if (existingUser) {
    throw new BadRequest("Address already exists for this user");
  }
  const newAddress = {
    street,
    city,
    state,
    userId,
  };
  const result = await collection.insertOne(newAddress);
  res.status(201).json({ message: "Address added successfully", data: result });
});
