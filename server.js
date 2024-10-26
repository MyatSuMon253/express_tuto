const express = require("express");
const logger = require("./middleware");
const morgan = require("morgan");
const notFound = require("./notFound");

const port = 5000;
const app = express();

let todos = [];

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ data: todos });
});

app.post("/create", (req, res) => {
  try {
    const { task } = req.body;
    if (!task) {
      res.status(400).json({ message: "Please provide a task" });
    }
    todos.push(task);
    res.status(201).json({ data: todos });
  } catch (error) {
    console.log(error.stack);
  }
});

app.put("/update/:id", (req, res) => {
  try {
    const id = req.params.id;
    const updatedtask = req.body.task;

    if (!todos[id]) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (!updatedtask) {
      return res.status(400).json({ message: "Please provide a task" });
    }
    todos[id] = updatedtask;
    res.status(200).json({ data: todos });
  } catch (error) {
    console.log(error.stack);
  }
});

app.delete("/delete/:id", (req, res) => {
  try {
    const id = req.params.id;
    if (!todos[id]) {
      return res.status(404).json({ message: "Task not found" });
    }
    todos.splice(id, 1);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error.stack);
  }
});

app.use(notFound);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
