const express = require("express");
const { createBlog } = require("../Controller/CreateBlog");

const router = express.Router();
router.use(express.json());

router.post("/", createBlog);

module.exports = router;
