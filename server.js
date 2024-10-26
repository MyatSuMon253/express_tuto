const express = require("express");
const logger = require("./middleware");
const morgan = require("morgan");

const port = 5000;
const app = express();

// app level middleware
app.use(logger);
app.use(express.static("./public"));

// third party middleware
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  console.log(req.method, req.url);
  res.send("Home");
});

app.post("/about", (req, res) => {
  console.log(req.method, req.url);
  res.send("About");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
