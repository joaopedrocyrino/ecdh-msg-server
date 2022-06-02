import { UserInputError } from 'apollo-server'

import Services from '../'
import { login, createUser } from '../../dto'
import { UserQuery } from '../../data/query'
import { Hash, Jwt } from '../../frameworks'
import { loginValidator, createValidator } from './validators'

class UserServices extends Services {
  async create (req: createUser): Promise<string> {
    await this.gateway({
      req,
      schema: createValidator
    })

    const { password, ...user } = req

    const hashedPassword = await Hash.setPassword(password)

    const base = this.createBase()

    await UserQuery.create({ ...base, ...user, password: hashedPassword })

    return base.id
  }

  async login (req: login): Promise<string> {
    await this.gateway({
      req,
      schema: loginValidator
    })

    const { id, password } = await UserQuery.login(req.login)

    if (!await Hash.verifyPassword(password, req.password)) {
      throw new UserInputError('invalid password')
    }

    const token = Jwt.sign(id)

    return token
  }
};

export default new UserServices()
