import { gql } from '@apollo/client'

export const EDIT_DESCRIPTION_BUNDLE = gql`
  mutation EditDescriptionBundle($bundleId: MongoID!, $description: String) {
    tagBundleUpdateById(
      _id: $bundleId
      record: { description: $description }
    ) {
      record {
        description
        name
      }
    }
  }
`

