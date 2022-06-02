import { UserInputError } from 'apollo-server'
import { FindConditions } from 'typeorm'
import { ChatModel } from '../models'

class ChatQuery {
  async create (chat: {
    id: string
    alice: string
    bob: string
    createdAt: string
    isDeleted: boolean
  }): Promise<void> {
    const prevChat = await ChatModel.findOne({
      where: [
        { alice: chat.alice, bob: chat.bob, isDeleted: false },
        { alice: chat.bob, bob: chat.alice, isDeleted: false }
      ]
    })

    if (prevChat) { throw new UserInputError('Chat already exists') }

    await new ChatModel(chat).save()
  }

  async getMany (where?: FindConditions<ChatModel> | Array<FindConditions<ChatModel>>): Promise<ChatModel[]> {
    const chats = await ChatModel.find({ where })
    return chats
  }

  async getOne (where: FindConditions<ChatModel> | Array<FindConditions<ChatModel>>): Promise<ChatModel> {
    const chat = await ChatModel.findOne({ where })
    if (!chat) { throw new UserInputError('Chat not found') }

    return chat
  }
}

export default new ChatQuery()
