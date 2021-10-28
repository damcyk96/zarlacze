import { gql } from '@apollo/client'

export const UPDATE_ENTRY = gql`
    mutation UpdateEntry($_id: MongoID!, $record: EntryCreateTypeInput) {
        createEntry(_id: $id ,record: $record) {
            _id
            startTime
            endTime
            tag {
                name
            }
        }
    }
`
