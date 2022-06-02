import { gql } from 'apollo-server'

import MsgServices from '../../../services/msg'
import { createMsg } from '../../../dto'

const typeDefs = gql`
type Msg {
  id: ID!
  chatId: ID!
  sender: ID!
  body: String!
  createdAt: String!
  isDeleted: Boolean!
  chat: Chat!
  user: User!
}

input CreateMsg {
  token: String!
  chatId: ID!
  body: String!
}

extend type Mutation {
  createMsg(input: CreateMsg!): ID!
}
`

export default {
  resolvers: {
    Mutation: {
      createMsg: async (root: any, { input }: { input: createMsg }) => await MsgServices.create(input)
    },
    Msg: {
      chat: async (root: any) => await MsgServices.chat(root.chatId),
      user: async (root: any) => await MsgServices.chat(root.sender)
    }
  },
  typeDefs: [typeDefs]
}
