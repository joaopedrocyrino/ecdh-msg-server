import Joi from 'joi'

export const createValidator = Joi.object({
  bob: Joi.string().guid().required(),
  userId: Joi.string().guid().required()
})

export const getOneValidator = Joi.object({
  id: Joi.string().guid().required(),
  userId: Joi.string().guid().required()
})
