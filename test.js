import test from 'ava'
import { search, getPackage } from './dist/algolia'

const pkg = 'graphql-shield'

test('Algolia - search', async t => {
   const res = await search({
      query: pkg,
      attributesToRetrieve: ['name'],
      attributesToHighlight: [],
      offset: 0,
      length: 1
   })

   t.is(res.hits[0].name, pkg)
})

test('Algolia - get package', async t => {
   const res = await getPackage({
      name: pkg,
      attributesToRetrive: ['name', 'readme']
   })

   console.log(res)

   t.is(res.name, pkg)
})
