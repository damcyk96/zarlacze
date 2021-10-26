import React from 'react'
import { Container, Button, Stack } from '@mui/material'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { LocalizationProvider } from '@mui/lab'
import SingleEntry from '../SingleEntry'
import Loader from '../Loader'
import { Box } from '@mui/system'
import { useMutation, gql } from '@apollo/client'
import useGetEntriesByDate from '../../graphql/queries/useGetEntriesByDate'
import { GET_ALL_ENTRIES } from '../../graphql/queries/useGetAllEntries'

const DELETE_ENTRY = gql`
  mutation DeleteEntry($_id: MongoID!) {
    entryRemoveById(_id: $_id) {
      recordId
    }
  }
`

const Entries = () => {
  const { data, loading } = useGetEntriesByDate()
  const [deleteEntry] = useMutation(DELETE_ENTRY, {
    refetchQueries: [GET_ALL_ENTRIES, 'GetAllEntries'],
  })

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
      </Container>
    </LocalizationProvider>
  )
}

export default Entries
