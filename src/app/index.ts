import { ApolloServer, Config } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import { rawSchema } from './graphql'
import socket from './socket'

const schema = makeExecutableSchema(rawSchema)

const serverConfig: Config = { schema }

export default {
  graph: new ApolloServer(serverConfig),
  socket
}
