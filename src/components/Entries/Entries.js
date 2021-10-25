import React, { useState } from 'react'
import {
  TextField,
  MenuItem,
  Select,
  Container,
  Button,
  Stack,
} from '@mui/material'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { LocalizationProvider, TimePicker } from '@mui/lab'
import SingleEntry from '../SingleEntry'
import Loader from '../Loader'
import { format } from 'date-fns'
import { Box } from '@mui/system'
import { useMutation, gql } from '@apollo/client'
import { dateState } from '../../context/date'
import useGetEntriesByDate, {
  GET_ENTRIES_BY_DATE,
} from '../../graphql/queries/useGetEntriesByDate'
import useGetAllEntries, {
  GET_ALL_ENTRIES,
} from '../../graphql/queries/useGetAllEntries'

const DELETE_ENTRY = gql`
  mutation DeleteEntry($_id: MongoID!) {
    entryRemoveById(_id: $_id) {
      recordId
    }
  }
`

const Entries = () => {
  const [value, setValue] = useState(null)
  const { dateQueryFormat } = dateState()

  // const { data, loading, error } = useGetEntriesByDate({
  //     variables: {
  //         date: dateQueryFormat,
  //     },
  // })
  const { data, loading, error } = useGetAllEntries()
  const [deleteEntry] = useMutation(DELETE_ENTRY, {
    refetchQueries: [GET_ALL_ENTRIES, 'GetAllEntries'],
  })

  if (loading) return <Loader />

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Container>
        <h1>My entries</h1>
        {data.map((singleEntry) => (
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
