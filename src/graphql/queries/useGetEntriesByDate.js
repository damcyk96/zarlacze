import { gql, useQuery } from '@apollo/client'

export const GET_ENTRIES_BY_DATE = gql`
    query GetEntriesByDate($date: Date!) {
  entryMany(filter: {date: $date}) {
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

export const useGetEntriesByDate = ({date}) => {
    const { data, loading, error } = useQuery(GET_ENTRIES_BY_DATE, {
      variables: {date}
    })

    return { data: data && data.entryMany, loading, error }
}

export default useGetEntriesByDate
