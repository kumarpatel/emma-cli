import algoliasearch from 'algoliasearch'

// Client
export const algolia = {
  appId: 'OFCNCOG2CU',
  apiKey: '6fe4476ee5a1832882e326b506d14126',
  indices: {
    packages: 'npm-search',
  },
}

const client = algoliasearch(algolia.appId, algolia.apiKey)

// Indices
const index = client.initIndex(algolia.indices.packages)

// Methods
export const search = query => index.search(query)
