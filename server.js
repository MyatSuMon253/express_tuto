const express = require("express");
const logger = require("./middleware");
const morgan = require("morgan");
const notFound = require("./notFound");
const AppError = require("./AppError");
const errorHandler = require("./errorHandler");
const { tryCatch } = require("./tryCatch");

const port = 5000;
const app = express();

let todos = [];

app.use(express.json());

const getUser = () => undefined;

app.get("/", (req, res) => {
  res.status(200).json({ data: todos });
});

app.post(
  "/create",
  tryCatch(async (req, res, next) => {
    const { task } = req.body;
    const user = getUser();
    if (!user) {
      throw new AppError("User not found");
    }
    if (!task) {
      res.status(400).json({ message: "Please provide a task" });
    }
    todos.push(task);
    res.status(201).json({ data: todos });
  })
);

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

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
