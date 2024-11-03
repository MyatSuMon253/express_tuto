const { ObjectId } = require("mongodb");
const { getDB } = require("../db/db");
const { BadRequest, NotFound } = require("../utils/AppError");
const { tryCatch } = require("../utils/tryCatch");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    name,
    email,
    password: hashedPassword,
  };
  const result = await collection.insertOne(newUser);
  res.status(201).json({ message: "Register Successfully", data: result });
});

exports.login = tryCatch(async (req, res, next) => {
  const db = getDB();
  const collection = db.collection("users");

  const { email, password } = req.body;
  const user = await collection.findOne({ email });
  if (!user) {
    throw new NotFound("User not found");
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw new BadRequest("Invalid credentials");
  }
  const token = generateToken(user._id);
  user.token = token
  console.log(token)
  res.status(200).json({ message: "Login Successfully", token });
});

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};


exports.logout = tryCatch(async (req, res, next) => {
  const userId = req.userId;
  res.status(200).json({ message: "Logout Successfully" });
})