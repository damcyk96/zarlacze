import React, { useState, useEffect } from 'react'
import { Container, Button, Stack } from '@mui/material'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { LocalizationProvider } from '@mui/lab'
import SingleEntry from '../SingleEntry'
import Loader from '../Loader'
import { Box } from '@mui/system'
import { useMutation } from '@apollo/client'
import useGetEntriesByDate, {
  GET_ENTRIES_BY_DATE,
} from '../../graphql/queries/useGetEntriesByDate'
import { DELETE_ENTRY } from '../../graphql/mutations/deleteEntry'
import { UPDATE_INDEX_ENTRY } from '../../graphql/mutations/updateEntry'
import useGetActiveBundles from '../../graphql/queries/useGetActiveBundles'

const Entries = () => {
  const { data, loading } = useGetEntriesByDate()
  const [entries, setEntries] = useState()
  const [deleteEntry] = useMutation(DELETE_ENTRY, {
    refetchQueries: [GET_ENTRIES_BY_DATE, 'GetEntriesByDate'],
  })
  const activeBundles = useGetActiveBundles()

  const [updateIndexEntry] = useMutation(UPDATE_INDEX_ENTRY)

  const reindexEntries = () => {
    for (let i = 0; i < entries.length; i++) {
      console.log(entries[i]._id)
      updateIndexEntry({
        variables: {
          _id: entries[i]._id,
          order: entries[i].order + 2,
        },
      })
    }
  }

  useEffect(() => {
    setEntries(data)
  }, [data])

  if (loading && activeBundles.loading) return <Loader />

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Container>
        <h1>My entries</h1>
        {entries?.map((singleEntry, index) => {
          console.log(index)
          return (
            <Box
              display="flex"
              justifyContent="center"
              key={singleEntry._id}
              style={{ marginTop: '1.25rem' }}
            >
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
          )
        })}
      </Container>
    </LocalizationProvider>
  )
}

export default Entries
