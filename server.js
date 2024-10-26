const express = require("express");
const app = express();
const port = 5000;

// route level middleware
const logger = (req, res, next) => {
  console.log(`logger: ${req.method} ${req.url}`);
  next();
};

app.get("/", logger, (req, res) => {
  console.log(req.method, req.url);
  res.send("Home");
});

app.post("/about", logger, (req, res) => {
  console.log(req.method, req.url);
  res.send("About");
});

// error handling middleware
app.use((req, res, next, err) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// third party middleware

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
