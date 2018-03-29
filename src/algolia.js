import { h, Text } from 'ink'
import algoliasearch from 'algoliasearch'

// Client

export const algolia = {
   appId: 'OFCNCOG2CU',
   apiKey: '6fe4476ee5a1832882e326b506d14126',
   indexName: 'npm-search'
}

const client = algoliasearch(algolia.appId, algolia.apiKey).initIndex(algolia.indexName)

// Methods

export const search = query => client.search(query)

export const getPackage = ({ name, attributesToRetrive }) =>
   client.getObject(name, attributesToRetrive)

// Logo

export const AlgoliaLogo = () => (
   <div>
      <Text>Search powered by</Text>
      <Text blue> Algolia</Text>
      <Text>.</Text>
   </div>
)
