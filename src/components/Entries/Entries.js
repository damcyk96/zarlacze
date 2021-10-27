import React, { useMemo, useState, useEffect } from 'react'
import { Container, Button, Stack } from '@mui/material'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { LocalizationProvider } from '@mui/lab'
import SingleEntry from '../SingleEntry'
import Loader from '../Loader'
import { Box } from '@mui/system'
import { useMutation, gql } from '@apollo/client'
import useGetEntriesByDate from '../../graphql/queries/useGetEntriesByDate'
import { GET_ALL_ENTRIES } from '../../graphql/queries/useGetAllEntries'
import { CopyToClipboard } from 'react-copy-to-clipboard'
const DELETE_ENTRY = gql`
  mutation DeleteEntry($_id: MongoID!) {
    entryRemoveById(_id: $_id) {
      recordId
    }
  }
`

const Entries = () => {
  const [valueToCopy, setvalueToCopy] = useState('')
  const [copied, setCopied] = useState(false)

  const { data, loading } = useGetEntriesByDate()
  const [entries, setEntries] = useState()
  const [deleteEntry] = useMutation(DELETE_ENTRY, {
    refetchQueries: [GET_ALL_ENTRIES, 'GetAllEntries'],
  })

  useMemo(() => {
    let str = ''
    if (entries) {
      entries.forEach(
        (element) =>
          (str += `${element.startTime} ${element.endTime} ${element.tag.tagBundle.name}-${element.tag.name}\n`)
      )
    }
    setvalueToCopy(str)
    console.log(str)
  }, [entries])

  useEffect(() => {
    setEntries(data)
  }, [data, entries])

  if (loading) return <Loader />

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Container>
        <h1>My entries</h1>
        {data?.map((singleEntry) => (
          <Box display="flex" justifyContent="center" key={singleEntry._id}>
            <Stack direction="row" spacing={2}>
              <SingleEntry singleEntry={singleEntry} />
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  deleteEntry({
                    variables: {
                      _id: singleEntry._id,
                    },
                  })
                }}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        ))}
        <CopyToClipboard text={valueToCopy} onCopy={() => setCopied(true)}>
          <button>Copy to clipboard with button</button>
        </CopyToClipboard>
      </Container>
    </LocalizationProvider>
  )
}

export default Entries
