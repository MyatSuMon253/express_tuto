const { ObjectId } = require("mongodb");
const { getDB } = require("../db/db");
const { BadRequest, NotFound } = require("../utils/AppError");
const { tryCatch } = require("../utils/tryCatch");

exports.getPost = tryCatch(async (req, res) => {
  const db = getDB();
  const userCollection = db.collection("users");
  const userName = req.query.name;
  const userId = new ObjectId(req.userId);
  const user = await userCollection.findOne({ _id: userId });
  if (!user) {
    throw new NotFound(`User ${userName} is not found`);
  }

  const result = await userCollection
    .aggregate([
      {
        $match: { name },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "userId",
          as: "user_post",
        },
      },
      {
        $project: {
          user_post: 1,
          _id: 0,
        },
      },
    ])
    .toArray();

  res.status(200).json({ message: true, data: result });
});

exports.getOnePost = tryCatch(async (req, res) => {
  const db = getDB();
  const collection = db.collection("posts");

  if (!ObjectId.isValid(req.params.id)) {
    throw new NotFound(`PostId ${req.params.id} is not found`);
  }
  const id = new ObjectId(req.params.id);

  result = await collection.findOne(id);
  res.status(200).json({ message: true, data: result });
});

exports.setPost = tryCatch(async (req, res, next) => {
  const db = getDB();
  const collection = db.collection("posts");

  const post = req.body.post;
  if (!post) {
    throw new BadRequest("Post must not be empty");
  }
  const userId = new ObjectId(req.userId);

  const newData = {
    post,
    userId,
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
