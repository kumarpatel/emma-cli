import algoliasearch from 'algoliasearch'

export const algolia = {
  appId: 'OFCNCOG2CU',
  apiKey: '6fe4476ee5a1832882e326b506d14126',
  indices: {
    packages: 'npm-search',
  },
}

const client = algoliasearch(algolia.appId, algolia.apiKey)

// Indices
const packages = client.initIndex(algolia.indices.packages)

export const search = query => packages.search(query)
