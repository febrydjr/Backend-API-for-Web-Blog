const express = require("express");
const { createBlog } = require("../controller/CreateBlog");
const getAllBlog = require("../controller/GetAllBlog");
const { getCategory, getCountry } = require("../controller/GetCategory");
const DeleteBlog = require("../controller/DeleteBlog");
const GetImageURL = require("../controller/GetBlogImageURL");
const router = express.Router();
router.use(express.json());

router.post("/", createBlog);
router.get("/", getAllBlog);
router.get("/all-category", getCategory);
router.get("/all-country", getCountry);
router.patch("/remove/:id", DeleteBlog);
router.get("/image-url/:blogs_id", GetImageURL);

module.exports = router;
