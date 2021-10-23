import { gql, useQuery } from '@apollo/client'

export const GET_ALL_ENTRIES = gql`
    query GetAllEntries {
  entryMany {
    _id
    startTime
    endTime
    order
    tag {
      name
      _id
      tagBundle {
        name
        _id
      }
    }
  }
}
`

export const useAllEntries = () => {
    const { data, loading, error } = useQuery(GET_ALL_ENTRIES)

    return { data: data && data.entryMany, loading, error }
}

export default useAllEntries
