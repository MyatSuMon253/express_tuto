const express = require("express");
const { connectDB, getDB } = require("./db/db");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const { ObjectId } = require("mongodb");
const { BadRequest, NotFound } = require("./utils/AppError");

const port = 5000;
const app = express();

connectDB()
  .then(() => {
    app.use(express.json());

    const db = getDB();
    const collection = db.collection("posts");

    app.get("/", async (req, res) => {
      try {
        const result = await collection.find({}).toArray();
        res.status(200).json({ message: true, data: result });
      } catch (error) {
        console.error(error);
      }
    });

    app.post("/", async (req, res, next) => {
      try {
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
        res
          .status(201)
          .json({ message: "Created successfully", data: newData });
      } catch (error) {
        next(error);
      }
    });

    app.put("/update/:id", async (req, res, next) => {
      try {
        if (!ObjectId.isValid(req.params.id)) {
          throw new NotFound(`PostId ${req.params.id} is not found`);
        }
        const id = new ObjectId(req.params.id);
        const updatedData = req.body;
        if (!!Object.values(updatedData).length) {
          throw new BadRequest("Updated data must not be empty");
        }
        const result = await collection.updateOne(
          { _id: id },
          { $set: updatedData }
        );
        res.status(200).json({ message: "Updated successfully", data: result });
      } catch (error) {
        next(error);
      }
    });

    app.delete("/delete/:id", async (req, res, next) => {
      try {
        const id = new ObjectId(req.query.id);
        const result = await collection.deleteOne({ _id: id });
        res.status(200).json({ message: "Deleted successfully", data: result });
      } catch (error) {
        next(error);
      }
    });

    app.use(notFound);
    app.use(errorHandler);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
