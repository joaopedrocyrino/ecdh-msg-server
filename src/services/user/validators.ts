import Joi from 'joi'

export const loginValidator = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().min(6).required()
})

export const createValidator = Joi.object({
  pubKey: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required()
})

export const getOneValidator = Joi.object({
  userId: Joi.string().guid().required()
})
