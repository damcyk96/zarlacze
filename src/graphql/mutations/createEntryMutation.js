import { gql } from '@apollo/client'

export const CREATE_ENTRY = gql`
    mutation CreateEntry($record: EntryCreateTypeInput) {
        createEntry(record: $record) {
            _id
            startTime
            endTime
            tag {
                name
            }
        }
    }
`
