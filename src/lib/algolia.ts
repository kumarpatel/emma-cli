import * as algoliasearch from 'algoliasearch'

// Client

export const algolia = {
  appId: 'OFCNCOG2CU',
  apiKey: '6fe4476ee5a1832882e326b506d14126',
  indices: {
    packages: 'npm-search',
    playlists: 'playlists',
  },
}

const client = algoliasearch(algolia.appId, algolia.apiKey)

const packagesIndex = client.initIndex(algolia.indices.packages)
// const playlistsIndex = client.initIndex(algolia.indices.playlists)

// Methods

export const search = (query: algoliasearch.AlgoliaQueryParameters) =>
  packagesIndex.search(query)

export const getPackage = (name: string, attributesToRetrive: string[]) =>
  packagesIndex.getObject(name, attributesToRetrive)
