import Joi from 'joi'

export const createValidator = Joi.object({
  body: Joi.string().required(),
  chatId: Joi.string().guid().required(),
  userId: Joi.string().guid().required()
})
