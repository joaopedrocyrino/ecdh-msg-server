import Joi from 'joi'

export const createValidator = Joi.object({
  bob: Joi.string().guid().required(),
  userId: Joi.string().guid().required()
})
