import { Column, Entity } from 'typeorm'
import BaseModel from './BaseModel'

@Entity('user')
export default class MsgModel extends BaseModel {
  @Column({ name: 'chat_id' })
  chatId: string

  @Column()
  body: string

  @Column()
  sender: string

  constructor (init: Partial<MsgModel>) {
    super()
    Object.assign(this, init)
  }
}
