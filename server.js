const express = require("express");
const { connectDB } = require("./db/db");

const port = 5000;
const app = express();

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
