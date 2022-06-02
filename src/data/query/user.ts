import { UserInputError } from 'apollo-server'

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

  async getOne (id: string): Promise<UserModel> {
    const user = await UserModel.findOne({ id, isDeleted: false })
    if (!user) { throw new UserInputError('User not found') }

    return user
  }
}

export default new UserQuery()
