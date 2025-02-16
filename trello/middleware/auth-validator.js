const {
  authValidator,
  verifyValidator,
  loginValidator,
} = require("../validator/authValidator");

class AuthValidate {
  authValidate(req, res, next) {
    const { error } = authValidator(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    return next();
  }

  verifyValidate(req, res, next) {
    const { error } = verifyValidator(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    return next();
  }

  loginValidate(req, res, next) {
    const { error } = loginValidator(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    return next();
  }
}
module.exports = new AuthValidate();
