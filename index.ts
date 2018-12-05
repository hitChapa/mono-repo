/**
 * Created by hitesh.c on 05/12/18.
 */
import bodyParser = require('body-parser')
import config = require('config')
import express = require('express')
import R = require('ramda')
const cors = require('cors')
import {graphiqlExpress, graphqlExpress} from 'apollo-server-express'
import {http} from 'gql-request'
import {accountLoaders, accountSchema} from 'gql-test-account'
import {accountResolver} from 'gql-test-account/resolver'
import {userLoaders, userSchema} from 'gql-test-user'
import {userResolver} from 'gql-test-user/resolver'
import {makeExecutableSchema} from 'graphql-tools'
import {mergeTypes} from 'merge-graphql-schemas'

const app = express()
app.use(cors({credentials: true, origin: true}))
const typeDefs = mergeTypes([userSchema, accountSchema])
const Schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: {
    Query: {
      user: userResolver,
      account: accountResolver
    }
  }
})
app.use(bodyParser.json())
app.use(
  '/graphql',
  graphqlExpress(request => {
    const loader = R.applySpec(R.mergeAll([userLoaders, accountLoaders]))(
      {HTTP: http(config)},
      request
    )
    const _request = R.merge({loader: loader}, request)
    return {
      schema: Schema,
      // formatError: formatError,
      context: _request
    }
  })
)

app.get('/health', (request: any, response: any) => {
  return response.json({status: 'Success'})
})
app.use('/health', graphiqlExpress({endpointURL: '/health'}))
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
app.use('/graphiql-mock', graphiqlExpress({endpointURL: '/graphql-mock'}))

app.listen(config.port)
