const Joi = require("@hapi/joi");

const userValidation = (data) => {
  const schema = Joi.object({
    First_Name: Joi.string().min(4).required(),
    Last_Name: Joi.string().min(4).required(),
    Email: Joi.string().min(6).required(),
    Password: Joi.string().min(6).required(),
    Date: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports.userValidation = userValidation;
