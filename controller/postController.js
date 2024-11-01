const { getDB } = require("../db/db");
const { BadRequest, NotFound } = require("../utils/AppError");
const { tryCatch } = require("../utils/tryCatch");

exports.getPosts = tryCatch(async (req, res) => {
  const db = getDB();
  const collection = db.collection("posts");
  const result = await collection.find({}).toArray();
  res.status(200).json({ message: true, data: result });
});

exports.setPost = tryCatch(async (req, res, next) => {
  const db = getDB();
  const collection = db.collection("posts");
  const post = req.body.post;
  if (!post) {
    throw new BadRequest("Post must not be empty");
  }

  const author = req.body.author;
  const { name, age } = author;
  if (!author || !name || !age) {
    throw new BadRequest("Author name and age must not be empty");
  }
  const newData = {
    post,
    author: {
      name,
      age,
    },
  };
  const result = await collection.insertOne(newData);
  res.status(201).json({ message: "Created successfully", data: newData });
});

exports.modifyPost = tryCatch(async (req, res, next) => {
  const db = getDB();
  const collection = db.collection("posts");
  if (!ObjectId.isValid(req.params.id)) {
    throw new NotFound(`PostId ${req.params.id} is not found`);
  }

  const id = new ObjectId(req.params.id);
  const updatedData = req.body;
  if (!!Object.values(updatedData).length) {
    throw new BadRequest("Updated data must not be empty");
  }

  const result = await collection.updateOne({ _id: id }, { $set: updatedData });
  if (result.modifiedCount === 0) {
    return res.status(404).json({ message: "Post is nothing change" });
  }

  res.status(200).json({ message: "Updated successfully", data: result });
});

exports.deletePost = tryCatch(async (req, res, next) => {
  const db = getDB();
  const collection = db.collection("posts");
  if (!ObjectId.isValid(req.params.id)) {
    throw new NotFound(`PostId ${req.params.id} is not found`);
  }
  const posts = await collection.find({}).toArray();
  const postId = new ObjectId(req.params.id);
  const existId = posts.find((post) => post._id.toString() == postId);

  if (!existId) {
    throw new NotFound(`PostId ${req.params.id} is not found`);
  }

  const result = await collection.deleteOne({ _id: postId });
  res.status(200).json({ message: "Deleted successfully", data: result });
});
