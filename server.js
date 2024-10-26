const express = require("express");
const { connectDB, getDB } = require("./db/db");

const port = 5000;
const app = express();

connectDB()
  .then(() => {
    app.use(express.json());

    app.get("/", async (req, res) => {
      try {
        const db = getDB();
        const collection = db.collection("posts");
        const result = await collection.find({}).toArray();
        res.status(200).json({ message: true, data: result });
      } catch (error) {}
    });

    app.post("/", async (req, res) => {
      try {
        const db = getDB();
        const collection = await db.collection("posts");

        const post = req.body.post;
        const author = req.body.author;
        const { name, age } = author;

        const newData = {
          post,
          author: {
            name,
            age,
          },
        };
        console.log(newData)
        const result = await collection.insertOne(newData);
        res.status(201).json({ message: "Created successfully", data: newData });
      } catch (error) {
        console.log(error)
      }
    });
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
