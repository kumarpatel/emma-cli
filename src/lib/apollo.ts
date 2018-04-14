import { OperationDefinitionNode } from 'graphql'
import fetch from 'isomorphic-fetch'
import ws from 'ws'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, split, from } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { getMainDefinition } from 'apollo-utilities'

interface Global {
  fetch: any
}

declare var global: Global

global.fetch = fetch

const emmaApiUrl = {
  url: 'http://localhost:4000',
  ws: 'ws://localhost:4000',
}

export function initApollo(getToken?: () => string): ApolloClient<any> {
  const httpLink = new HttpLink({
    uri: emmaApiUrl.url,
  })

  const authLink = new ApolloLink((operation, forward) => {
    const token = getToken && getToken()

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : null,
      },
    }))

    return forward!(operation)
  })

  const subscriptionsClient = new SubscriptionClient(
    emmaApiUrl.ws,
    {
      reconnect: true,
    },
    ws,
  )

  const wsLink = new WebSocketLink(subscriptionsClient)

  // Client

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(
        query,
      ) as OperationDefinitionNode
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    from([authLink, httpLink]),
  )

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    ssrMode: true,
  })

  return client
}
