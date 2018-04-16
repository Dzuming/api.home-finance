import Joi from 'joi';

const financeFlowSchema = Joi.object({
  id: Joi.number().positive(),
  value: Joi.number()
    .positive()
    .required(),
  description: Joi.string().required(),
  categoryId: Joi.number()
    .integer()
    .positive()
    .required(),
  userId: Joi.number()
    .integer()
    .positive()
    .required(),
  period: Joi.string().required(),
});

const validate = schema => data =>
  Joi.validate(data, schema, {
    allowUnknown: false,
    abortEarly: false,
  });

export const validateFinanceFlow = validate(financeFlowSchema);
