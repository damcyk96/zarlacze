import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { CREATE_ENTRY } from '../../graphql/mutations/createEntryMutation'
import { GET_ALL_ENTRIES } from '../../graphql/queries/useGetAllEntries'

<<<<<<< HEAD
const CREATE_ENTRY = gql`
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
=======

>>>>>>> 50c69b0a072883ab9594260524d614202f8894fe

const NewEntry = () => {
  const [newEntryValue, setNewEntryValue] = useState('')
  const [createEntry] = useMutation(CREATE_ENTRY, {
    refetchQueries: [GET_ALL_ENTRIES, 'GetAllEntries'],
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    createEntry({
      variables: {
        record: {
          tagBundleName: '111',
          tagName: newEntryValue,
        },
      },
    })
    setNewEntryValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={newEntryValue}
        onChange={(event) => setNewEntryValue(event.target.value)}
      />
      <button>ADD ENTRY</button>
    </form>
  )
}

export default NewEntry
