import { gql } from '@apollo/client'

export const UPDATE_ENTRY = gql`
  mutation UpdateEntry($_id: ID!, $record: EntryCreateTypeInput) {
    updateEntry(_id: $_id, record: $record) {
      _id
      startTime
      endTime
      tag {
        name
      }
    }
  }
`



// export const EDIT_DESCRIPTION_BUNDLE = gql`
//   mutation EditDescriptionBundle($bundleId: MongoID!, $description: String) {
//     tagBundleUpdateById(
//       _id: $bundleId
//       record: { description: $description }
//     ) {
//       record {
//         description
//         name
//       }
//     }
//   }
// `
