const { ObjectId } = require("mongodb");
const { getDB } = require("../db/db");
const { BadRequest, NotFound } = require("../utils/AppError");
const { tryCatch } = require("../utils/tryCatch");

exports.register = tryCatch(async (req, res, next) => {
  const db = getDB();
  const collection = db.collection("users");
  const users = await collection.find({}).toArray();
  const { name, email, password, password_confirmation } = req.body;
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    throw new BadRequest("Email have been already exist!");
  }
  if (password !== password_confirmation) {
    throw new BadRequest("Password does not match");
  }
  const newUser = {
    name,
    email,
    password,
    password_confirmation,
  };
  const result = await collection.insertOne(newUser);
  res.status(201).json({ message: "Register Successfully", data: result });
});
