import Services from '..'
import { createMsg } from '../../dto'
import { MsgQuery, ChatQuery, UserQuery } from '../../data/query'
import { createValidator } from './validators'
import app from '../../app'
import { ChatModel, UserModel } from '../../data/models'

class MsgServices extends Services {
  async create ({ token, ...req }: createMsg): Promise<string> {
    await this.gateway({
      token,
      req,
      schema: createValidator
    })

    const { body, userId, chatId } = req as { body: string, userId: string, chatId: string }

    const base = this.createBase()

    const msg = await MsgQuery.create({ ...base, body, chatId, sender: userId })

    app.socket.emit(chatId, msg)

    return base.id
  }

  async chat (id: string): Promise<ChatModel> {
    const chat = await ChatQuery.getOne({ id, isDeleted: false })
    return chat
  }

  async user (id: string): Promise<UserModel> {
    const user = await UserQuery.getOne({ id, isDeleted: false })
    return user
  }
};

export default new MsgServices()
