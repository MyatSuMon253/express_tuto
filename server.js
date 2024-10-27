const express = require("express");
const { connectDB, getDB } = require("./db/db");
const notFound = require("./middleware/notFound");
const { ObjectId } = require("mongodb");

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
      } catch (error) {}
    });

    app.post("/", async (req, res) => {
      try {
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

    app.put("/update/:id", async (req, res) => {
      try {
        const id = new ObjectId(req.params.id)
        const updatedData = req.body;
        const result = await collection.updateOne({ _id: id }, { $set: updatedData });
        res.status(200).json({ message: "Updated successfully", data: result });
      } catch (error) {
        console.log(error)
      }
    });

    app.delete('/delete/:id', async(req, res)=>{
      try {
        const id = new ObjectId(req.query.id)
        const result = await collection.deleteOne({_id: id})
        res.status(200).json({message: 'Deleted successfully', data: result})
      } catch (error) {
        console.log(error)
      }
    } )

    app.use(notFound)

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
