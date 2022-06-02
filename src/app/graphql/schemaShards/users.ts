import { gql } from 'apollo-server'

import UserServices from '../../../services/user'
import { login, createUser } from '../../../dto'

const typeDefs = gql`
type User {
  id: ID!
  pubKey: String!
  login: String!
  createdAt: String!
  isDeleted: Boolean!
}

input Login {
  login: String!
  password: String!
}

input CreateUser {
  pubKey: String!
  login: String!
  password: String!
}

extend type Query {
  login(input: Login!): String
}

extend type Mutation {
  createUser(input: CreateUser!): ID!
}
`

export default {
  resolvers: {
    Query: {
      login: async (root: any, { input }: { input: login }) => await UserServices.login(input)
    },
    Mutation: {
      createUser: async (root: any, { input }: { input: createUser }) => await UserServices.create(input)
    }
  },
  typeDefs: [typeDefs]
}
