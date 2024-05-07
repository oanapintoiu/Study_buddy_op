const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

class TokenGenerator {
  static jsonwebtoken(user_id) {
    console.log("Generating jsonwebtoken", secret);
    return JWT.sign(
      {
        user_id: user_id,
        iat: Math.floor(Date.now() / 1000),

        exp: Math.floor(Date.now() / 1000) + 1 * 24 * 60 * 60, // 24h
      },
      secret
    );
  }
}

module.exports = TokenGenerator;
