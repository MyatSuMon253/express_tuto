const express = require("express");
const { connectDB } = require("./db/db");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter");
const addressRouter = require("./routes/addressRoute");

const port = 5000;
const app = express();

connectDB()
  .then(() => {
    app.use(express.json());
    app.use("/api/v1/post", postRouter);
    app.use("/api/v1/user", userRouter);
    app.use("/api/v1/address", addressRouter);

    app.use(notFound);
    app.use(errorHandler);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
