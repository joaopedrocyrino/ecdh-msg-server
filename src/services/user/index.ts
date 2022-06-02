import { UserInputError } from 'apollo-server'

import Services from '../'
import { login, createUser } from '../../dto'
import { UserQuery, ChatQuery } from '../../data/query'
import { Hash, Jwt } from '../../frameworks'
import { loginValidator, createValidator } from './validators'
import { ChatModel } from '@/data/models'

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

    const token = Jwt.sign(base.id)

    return token
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

  async chats (id: string): Promise<ChatModel[]> {
    const chats = await ChatQuery.getMany([
      { isDeleted: false, alice: id },
      { isDeleted: false, bob: id }
    ])

    return chats
  }
};

export default new UserServices()
