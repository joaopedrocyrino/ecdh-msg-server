import { AuthenticationError, UserInputError } from 'apollo-server'
import moment from 'moment'
import Joi from 'joi'

import { Jwt, Uuid } from '../frameworks'

class Services {
  protected createBase (): {
    id: string
    createdAt: string
    isDeleted: boolean
  } {
    const timestamptz = moment().toISOString()

    return {
      id: Uuid.generate(),
      createdAt: timestamptz,
      isDeleted: false
    }
  };

  protected async gateway ({ token, schema, req }: {
    token?: string
    schema?: Joi.ObjectSchema<any>
    req: any
  }): Promise<void> {
    if (token) {
      const { error, userId } = await Jwt.decode(token)
      if (error) { throw new AuthenticationError('not_authenticated') }

      req.userId = userId
    }

    this.checkRequest(req, schema)
  }

  private readonly checkRequest = (
    request: any,
    schema?: Joi.ObjectSchema<any>
  ): void => {
    if (schema) {
      const { error } = schema.validate(request)
      if (error) {
        console.log(error)
        throw new UserInputError('')
      }
    }
  }
};

export default Services
