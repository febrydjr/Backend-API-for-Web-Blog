const jwt = require("jsonwebtoken");

const keepLogin = (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, "your-secret-key");
    const userId = decodedToken.userId;
    const userData = {
      id: userId,
      username: "iniuser",
      email: "contohgan@cth.com",
      phone: "1234567890",
    };

    res.json(userData);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = keepLogin;
