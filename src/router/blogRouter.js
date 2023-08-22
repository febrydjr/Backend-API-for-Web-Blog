const express = require("express");
const { createBlog } = require("../Controller/CreateBlog");
const getAllBlog = require("../Controller/GetAllBlog");
const { getCategory, getCountry } = require("../Controller/GetCategory");
const DeleteBlog = require("../Controller/DeleteBlog");
const GetImageURL = require("../Controller/GetBlogImageURL");
const router = express.Router();
router.use(express.json());

router.post("/", createBlog);
router.get("/", getAllBlog);
router.get("/all-category", getCategory);
router.get("/all-country", getCountry);
router.patch("/remove/:id", DeleteBlog);
router.get("/image-url/:blogs_id", GetImageURL);

module.exports = router;
