import { gql, useQuery } from '@apollo/client'
import { dateState } from '../../context/date'

export const GET_ENTRIES_BY_DATE = gql`
  query GetEntriesByDate($dateQueryFormat: Date!) {
    entryMany(filter: { date: $dateQueryFormat }) {
      _id
      createdAt
      startTime
      endTime
      order
      date
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

export const useGetEntriesByDate = () => {
  const { dateQueryFormat } = dateState()
  const { data, loading, error } = useQuery(GET_ENTRIES_BY_DATE, {
    variables: { dateQueryFormat },
  })

  return { data: data && data.entryMany, loading, error }
}

export default useGetEntriesByDate
