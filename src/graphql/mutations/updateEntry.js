import { gql } from '@apollo/client'

export const UPDATE_ENTRY = gql`
    mutation UpdateEntry($_id: ID!, $record: EntryCreateTypeInput) {
        updateEntry(_id: $_id ,record: $record) {
            _id
            startTime
            endTime
            tag {
                name
            }
        }
    }
`
    