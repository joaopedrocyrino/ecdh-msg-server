import Services from '..'
import { createChat } from '../../dto'
import { ChatQuery, MsgQuery, UserQuery } from '../../data/query'
import { createValidator } from './validators'
import { MsgModel, UserModel } from '../../data/models'

class ChatServices extends Services {
  async create ({ token, ...req }: createChat): Promise<string> {
    await this.gateway({
      token,
      req,
      schema: createValidator
    })

    const { bob, userId } = req as { bob: string, userId: string }

    const base = this.createBase()

    await ChatQuery.create({ ...base, bob, alice: userId })

    return base.id
  }

  async msgs (id: string): Promise<MsgModel[]> {
    const msgs = await MsgQuery.getMany({ isDeleted: false, chatId: id })
    return msgs
  }

  async users (alice: string, bob: string): Promise<UserModel[]> {
    const users = await UserQuery.getMany([{ isDeleted: false, id: alice }, { isDeleted: false, id: bob }])
    return users
  }
};

export default new ChatServices()
