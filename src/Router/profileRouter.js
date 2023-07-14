const express = require("express");
const { upload, uploadAvatar } = require("../controller/AvatarUpload");

const router = express.Router();
router.use(express.json());

router.post("/avatar-upload", upload, uploadAvatar);

module.exports = router;
