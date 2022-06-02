import Services from '..'
import { createChat, getOneChat } from '../../dto'
import { ChatQuery, MsgQuery, UserQuery } from '../../data/query'
import { createValidator, getOneValidator } from './validators'
import { ChatModel, MsgModel, UserModel } from '../../data/models'

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

  async getOne ({ token, ...req }: getOneChat): Promise<ChatModel> {
    await this.gateway({
      token,
      req,
      schema: getOneValidator
    })

    const { id, userId } = req as { userId: string, id: string }

    const chat = await ChatQuery.getOne([
      { id, alice: userId, isDeleted: false },
      { id, bob: userId, isDeleted: false }
    ])

    return chat
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
