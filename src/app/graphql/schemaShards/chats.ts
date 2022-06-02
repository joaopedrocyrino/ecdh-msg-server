import { gql } from 'apollo-server'

import UserServices from '../../../services/user'
import { createUser } from '../../../dto'

const typeDefs = gql`
type Chat {
  id: ID!
  alice: ID!
  bob: ID!
  createdAt: String!
  isDeleted: Boolean!
}

input CreateChat {
  token: String!
  bob: ID!
}

extend type Mutation {
  createChat(input: CreateChat!): ID!
}
`

export default {
  resolvers: {
    Mutation: {
      createChat: async (root: any, { input }: { input: createUser }) => await UserServices.create(input)
    }
  },
  typeDefs: [typeDefs]
}
