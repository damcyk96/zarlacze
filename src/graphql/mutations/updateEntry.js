import { gql } from '@apollo/client'

export const UPDATE_INDEX_ENTRY = gql`
  mutation UpdateIndexEntry($_id: ID!, $order: Int!) {
    updateEntry(_id: $_id, record: { order: $order }) {
      _id
      order
    }
  }
`

// export const UPDATE_ENTRY = gql`
//   mutation UpdateIndexEndtry($record: EntryCreateTypeInput) {
//     createEntry(record: $record) {
//       _id
//       startTime
//       endTime
//       tag {
//         name
//       }
//     }
//   }
// `
