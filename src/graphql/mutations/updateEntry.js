import { gql } from '@apollo/client'

export const UPDATE_ENTRY = gql`
  mutation UpdateEntry($_id: ID!, $tagBundleName: String!, $tagName: String!, $startTime: String, $endTime: String!) {
    updateEntry(_id: $_id, record: {tagBundleName: $tagBundleName, tagName: $tagName, endTime: $endTime, startTime: $startTime}) {
      _id
      startTime
      endTime
      tag {
        name
      }
    }
  }
`
