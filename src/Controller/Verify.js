const verificationTokens = {};
const contohtoken = "c0Nt0hHTok3n";
verificationTokens[contohtoken] = { used: false };

const verify = (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");

    if (!verificationTokens[token] || verificationTokens[token].used) {
      return res.status(401).json({
        message: "Token tidak valid atau telah expired.",
      });
    }

    verificationTokens[token].used = true;

    return res.status(200).json({ message: "Verifikasi email berhasil." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Terjadi kesalahan saat memproses verifikasi email.",
    });
  }
};

module.exports = verify;
