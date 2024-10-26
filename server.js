const express = require("express");
const app = express();
const port = 5000;
const logger = require("./middleware");

// app level middleware
app.use(logger);
app.use(express.static("./public"));

app.get("/", (req, res) => {
  console.log(req.method, req.url);
  res.send("Home");
});

app.post("/about", (req, res) => {
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
