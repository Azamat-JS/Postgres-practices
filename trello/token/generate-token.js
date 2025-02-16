const jwt = require("jsonwebtoken");

class Token {
  createToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: process.env.ACCESS_TIME,
    });
  }
}

module.exports = new Token();
