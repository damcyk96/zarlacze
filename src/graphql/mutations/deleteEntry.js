import { gql } from '@apollo/client'

export const DELETE_ENTRY = gql`
  mutation DeleteEntry($_id: MongoID!) {
    entryRemoveById(_id: $_id) {
      recordId
    }
  }
`
