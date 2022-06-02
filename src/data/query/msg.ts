import { UserInputError } from 'apollo-server'
import { FindConditions } from 'typeorm'
import { MsgModel } from '../models'
import ChatQuery from './chat'
import UserQuery from './user'

class MsgQuery {
  async create (msg: {
    id: string
    chatId: string
    body: string
    sender: string
    createdAt: string
    isDeleted: boolean
  }): Promise<MsgModel> {
    await UserQuery.getOne({ id: msg.sender, isDeleted: false })

    await ChatQuery.getOne([
      { alice: msg.sender, isDeleted: false, id: msg.chatId },
      { bob: msg.sender, isDeleted: false, id: msg.chatId }
    ])

    const newMsg = new MsgModel(msg)

    await newMsg.save()

    return newMsg
  }

  async getMany (where?: FindConditions<MsgModel> | Array<FindConditions<MsgModel>>): Promise<MsgModel[]> {
    const msgs = await MsgModel.find({ where })
    return msgs
  }

  async getOne (where: FindConditions<MsgModel> | Array<FindConditions<MsgModel>>): Promise<MsgModel> {
    const msg = await MsgModel.findOne({ where })
    if (!msg) { throw new UserInputError('Msg not found') }

    return msg
  }
}

export default new MsgQuery()
