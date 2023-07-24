const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const extractToken = (req) => {
    const user = await UserActivation.findOne()
  return (token = jwt.sign(
    {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      isverified: user.isverified,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  ));
};

module.exports = extractToken;
