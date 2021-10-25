import { gql, useQuery } from '@apollo/client'

export const GET_BUNDLE_BY_ID = gql`
  query getPagination($filter: FilterFindManyTagOperatorsInput!, $page: Int!) {
    tagPagination(
      filter: { tagBundleId: $filter }
      page: 1
      perPage: 10
    ) {
      pageInfo {
        pageCount
        itemCount
        hasNextPage
        hasPreviousPage
        currentPage
      }
      count
      items {
        name
        tagBundleId
      }
    }
  }
`

export const useGetTagsByBundleId = () => {
  const { data, loading, error } = useQuery(GET_BUNDLE_BY_ID)

  return { data, loading, error }
}

export default useGetTagsByBundleId
