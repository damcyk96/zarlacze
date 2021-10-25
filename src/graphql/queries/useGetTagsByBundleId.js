import { gql, useQuery } from '@apollo/client'

export const GET_TAGS_BY_ID = gql`
  query getPagination($filter: MongoID!, $page: Int!) {
    tagPagination(
      filter: { tagBundleId: $filter }
      page: $page
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

// export const useGetTagsByBundleId = (id, page) => {
//   const { data, loading, error } = useQuery(GET_BUNDLE_BY_ID, {
//       variables: {
//         filter: id,
//         page: page
//       }
//   })

//   return { data: data && data.tagBundleById, loading, error }
// }

