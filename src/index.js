const path = require("path");
const authRouter = require("./router/authRouter.js");
const profileRouter = require("./router/profileRouter.js");
const blogRouter = require("./Router/blogRouter.js");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const port = process.env.PORT;

const app = express();

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/blog", blogRouter);

app.listen(port, () => {
  console.log(`API Server is running on port ${port}`);
});
