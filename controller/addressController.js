const { ObjectId } = require("mongodb");
const { getDB } = require("../db/db");
const { BadRequest, NotFound } = require("../utils/AppError");
const { tryCatch } = require("../utils/tryCatch");

exports.getOneAddress = tryCatch(async (req, res) => {
  const db = getDB();
  const collection = db.collection("address");

  if (!ObjectId.isValid(req.params.id)) {
    throw new NotFound(`Id ${req.params.id} is not found`);
  }
  const id = new ObjectId(req.params.id);

  result = await collection.findOne(id);
  res.status(200).json({ message: true, data: result });
});

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

exports.modifyAddress = tryCatch(async (req, res, next) => {
  const db = getDB();
  const collection = db.collection("address");
  if (!ObjectId.isValid(req.params.id)) {
    throw new NotFound(`Id ${req.params.id} is not found`);
  }

  const id = new ObjectId(req.params.id);
  const updatedData = req.body;
  if (!!Object.keys(updatedData).length) {
    throw new BadRequest("Updated data must not be empty");
  }

  const result = await collection.updateOne({ _id: id }, { $set: updatedData });
  if (result.modifiedCount === 0) {
    return res.status(404).json({ message: "Address is nothing change" });
  }

  res.status(200).json({ message: "Updated successfully", data: result });
});
