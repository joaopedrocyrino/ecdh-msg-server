import { Column, Entity } from 'typeorm'
import BaseModel from './BaseModel'

@Entity('chat')
export default class ChatModel extends BaseModel {
  @Column()
  alice: string

  @Column()
  bob: string

  constructor (init: Partial<ChatModel>) {
    super()
    Object.assign(this, init)
  }
}
