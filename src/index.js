const path = require("path");
const authRouter = require("./Router/authRouter.js");
const blogRouter = require("./Router/blogRouter.js");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const port = process.env.PORT;

const app = express();

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
