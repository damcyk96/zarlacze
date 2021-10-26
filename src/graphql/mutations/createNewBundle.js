import { gql } from '@apollo/client'

export const CREATE_BUNDLE = gql`
  mutation CreateBundle($record: CreateOneTagBundleInput!) {
    tagBundleCreateOne(record: $record) {
      recordId
      record {
        name
        description
        creatorId
        _id
      }
      error {
        message
      }
    }
  }
`
