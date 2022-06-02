import { mergeRawSchemas } from '../utils/mergeRawSchemas'
import users from './users'
import chats from './chats'
import msgs from './msgs'

export default mergeRawSchemas(
  users,
  chats,
  msgs
)
