import { gql, useQuery } from '@apollo/client'

export const GET_TAGS_BY_BUNDLE_ID = gql`
  query GetTagsByBundleId($_id: MongoID!) {
    tagBundleById(_id: $id) {
      name
      tags {
        name
        _id
      }
    }
  }
`
