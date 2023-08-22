const db = require("../models");
const User = db.User;

const GetUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "user_id",
        "username",
        "password",
        "phone",
        "email",
        "isverified",
      ],
    });
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "gagal fetch users" });
  }
};

module.exports = GetUsers;
