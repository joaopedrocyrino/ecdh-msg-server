import { UserInputError } from 'apollo-server'
import { FindConditions } from 'typeorm'

import { UserModel } from '../models'

class UserQuery {
  async create (user: {
    id: string
    login: string
    password: string
    pubKey: string
    createdAt: string
    isDeleted: boolean
  }): Promise<void> {
    const prevUser = await UserModel.findOne({
      where: [
        { isDeleted: false, password: user.password },
        { isDeleted: false, login: user.login },
        { isDeleted: false, pubKey: user.pubKey }
      ]
    })

    if (prevUser) { throw new UserInputError('User already exists') }

    await new UserModel(user).save()
  }

  async login (login: string): Promise<UserModel> {
    const user = await UserModel.findOne({
      where: { login, isDeleted: false },
      select: ['password', 'id']
    })

    if (!user) { throw new UserInputError('user not found') }

    return user
  }

  async getMany (where?: FindConditions<UserModel> | Array<FindConditions<UserModel>>): Promise<UserModel[]> {
    const users = await UserModel.find({ where })
    return users
  }

  async getOne (where: FindConditions<UserModel> | Array<FindConditions<UserModel>>): Promise<UserModel> {
    const user = await UserModel.findOne({ where })
    if (!user) { throw new UserInputError('User not found') }

    return user
  }
}

export default new UserQuery()
