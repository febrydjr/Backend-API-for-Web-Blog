const express = require("express");
const { upload, uploadAvatar } = require("../controller/AvatarUpload");
const { getAvatar } = require("../Controller/GetAvatar");
const router = express.Router();
router.use(express.json());

router.post("/avatar-upload", upload, uploadAvatar);
router.get("/get-avatar", getAvatar);

module.exports = router;
