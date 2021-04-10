const Joi = require("@hapi/joi");

const userValidation = (data) => {
  const schema = Joi.object({
    Name: Joi.string().min(4).required(),
    UserName: Joi.string().min(4).required(),
    Email: Joi.string().min(6).required(),
    Password: Joi.string().min(6).required(),
    Image: Joi.any(),
  });
  return schema.validate(data);
};

module.exports.userValidation = userValidation;
