const Joi = require('joi');

const requiredValidate = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
});

const greatestValidate = Joi.object({
  quantity: Joi.number().min(1),
});

const saleSchema = (fields) => {
  const { error: errRequired } = requiredValidate.validate(fields);
  const { error: errGreatest } = greatestValidate.validate({ quantity: fields.quantity });
  if (errRequired) return { code: 400, content: { message: errRequired.message } };
  if (errGreatest) return { code: 422, content: { message: errGreatest.message } };
  return false;
};

const saleValidation = (req, res, next) => {
  const { name, quantity } = req.body;
  const resultValidation = saleSchema({ name, quantity });
  if (resultValidation !== false) {
    return res.status(resultValidation.code).json(resultValidation.content);
  }
  next();
};

module.exports = saleValidation;