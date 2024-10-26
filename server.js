const express = require("express");
const logger = require("./middleware");
const morgan = require("morgan");

const port = 5000;
const app = express();

let todos = [];

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ data: todos });
});

app.post("/create", (req, res) => {
  const task = req.body.task;
  console.log(task);
  todos.push(task);
  res.status(201).json({ data: todos });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const updatedtask = req.body.task;
  todos[id] = updatedtask;
  res.status(200).json({ data: todos });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  todos.splice(id, 1);
  res.status(200).json({ data: todos });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
