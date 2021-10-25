import { gql, useQuery } from '@apollo/client'

export const GET_BUNDLE_BY_ID = gql`
  query TagBundleById($_id: MongoID!) {
    tagBundleById(_id: $_id) {
      name
      description
      tags {
        name
      }
      creator {
        _id
      }
    }
  }
`

export const useGetBundleById = (bundleId) => {
  const { data, loading, error } = useQuery(GET_BUNDLE_BY_ID, {
      variables: {
          _id: bundleId
      }
  })

  return { data, loading, error }
}

export default useGetBundleById
