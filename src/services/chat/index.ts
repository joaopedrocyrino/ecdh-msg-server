import Services from '..'
import { createChat } from '../../dto'
import { ChatQuery } from '../../data/query'
import { createValidator } from './validators'

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
};

export default new ChatServices()
