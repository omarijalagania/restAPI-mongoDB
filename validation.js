const Joi = require("joi");

const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    cart: Joi.object({
      items: Joi.array().items(
        Joi.object({
          title: Joi.string(),
          description: Joi.string(),
          price: Joi.string(),
          image: Joi.string(),
        })
      ),
    }),
  });

  return schema.validate(data);
};

module.exports.validateLogin = validateLogin;
module.exports.validateRegister = validateRegister;
