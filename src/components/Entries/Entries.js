import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import TimePicker from '@mui/lab/TimePicker'
import Loader from '../Loader'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Container } from '@mui/material'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display="flex" justifyContent="center" flexDirection="column">
        {data.map((singleEntry) => {
          return (
            <Box display="flex" justifyContent="center" key={singleEntry._id} marginTop="2rem">
              <Stack direction="row" spacing={2}>
                <TimePicker
                  flex
                  label="Start time"
                  value="00:00"
                  ampm={false}
                  onChange={(newValue) => {
                    setValue(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                  label="End time"
                  value="00:30"
                  ampm={false}
                  onChange={(newValue) => {
                    setValue(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Bundle"
                  value={singleEntry.tag.tagBundle.name}
                  style={{minWidth: "12rem"}}

                >
                  <MenuItem value={singleEntry.tag.tagBundle.name}>
                    {singleEntry.tag.tagBundle.name}
                  </MenuItem>
                </Select>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Tag"
                  value={singleEntry.tag.name}
                  style={{minWidth: "12rem"}}
                >
                  <MenuItem value={singleEntry.tag.name}>
                    {singleEntry.tag.name}
                  </MenuItem>
                </Select>
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
      </Box>
    </LocalizationProvider>
  )
}

export default Entries
