import { gql } from 'apollo-server'

import ChatServices from '../../../services/chat'
import { createChat, getOneChat } from '../../../dto'

const typeDefs = gql`
type Chat {
  id: ID!
  alice: ID!
  bob: ID!
  createdAt: String!
  isDeleted: Boolean!
  msgs: [Msg]!
  users: [User!]!
}

input CreateChat {
  token: String!
  bob: ID!
}

input GetOneChat {
  token: String!
  id: ID!
}

extend type Query {
  getOneChat(input: GetOneChat!): Chat!
}

extend type Mutation {
  createChat(input: CreateChat!): ID!
}
`

export default {
  resolvers: {
    Mutation: {
      createChat: async (root: any, { input }: { input: createChat }) => await ChatServices.create(input)
    },
    Query: {
      getOneChat: async (root: any, { input }: { input: getOneChat }) => await ChatServices.getOne(input)
    },
    Chat: {
      msgs: async (root: any) => await ChatServices.msgs(root.id),
      users: async (root: any) => await ChatServices.users(root.alice, root.bob)
    }
  },
  typeDefs: [typeDefs]
}
