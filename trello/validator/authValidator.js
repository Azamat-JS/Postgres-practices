const joi = require("joi");

class JoiValidator {
    authValidator (data) {
        const schema = joi.object({
          username: joi.string().min(3).max(55).required(),
          email: joi.string().email().required(),
          parol: joi.string().min(6).required(),
          userrole: joi.string().max(30),
        });
        return schema.validate(data);
      };
      
       verifyValidator (data) {
        const schema = joi.object({
          email: joi.string().email().required(),
          code: joi.number(),
        });
        return schema.validate(data);
      };
      
       loginValidator (data) {
        const schema = joi.object({
          email: joi.string().email().required(),
          parol: joi.string().min(6).required(),
        });
        return schema.validate(data);
      };
}

module.exports = new JoiValidator();
