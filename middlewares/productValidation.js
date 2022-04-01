const Joi = require('joi');

const requiredValidate = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().required(),
});

const greatestValidate = Joi.object({
  name: Joi.string().min(5),
  quantity: Joi.number().min(1),
});

const productSchema = (fields) => {
  const { error: errRequired } = requiredValidate.validate(fields);
  const { error: errGreatest } = greatestValidate.validate(fields);
  if (errRequired) return { code: 400, content: { message: errRequired.message } };
  if (errGreatest) return { code: 422, content: { message: errGreatest.message } };
  return false;
};

const productValidation = (req, res, next) => {
  const { name, quantity } = req.body;
  const resultValidation = productSchema({ name, quantity });
  if (resultValidation !== false) {
    return res.status(resultValidation.code).json(resultValidation.content);
  }
  next();
};

module.exports = productValidation;