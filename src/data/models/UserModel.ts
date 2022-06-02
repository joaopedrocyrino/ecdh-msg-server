import { Column, Entity } from 'typeorm'
import BaseModel from './BaseModel'

@Entity('user')
export default class UserModel extends BaseModel {
  @Column({ unique: true })
  login: string

  @Column({ name: 'pub_key' })
  pubKey: string

  @Column({ select: false })
  password: string

  constructor (init: Partial<UserModel>) {
    super()
    Object.assign(this, init)
  }
}
