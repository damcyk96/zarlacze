import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import TimePicker from '@mui/lab/TimePicker'
import Loader from '../Loader'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import useAllEntries from '../../graphql/queries/useAllEntries/useAllEntries'
import { Container } from '@mui/material'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { GET_ALL_ENTRIES } from './../../graphql/queries/useAllEntries/useAllEntries'
import { useMutation, gql } from '@apollo/client'

const DELETE_ENTRY = gql`
    mutation DeleteEntry($_id: MongoID!) {
        entryRemoveById(_id: $_id) {
            recordId
        }
    }
`

const Entries = () => {
    const { data, loading, error } = useAllEntries()
    const [value, setValue] = useState(null)
    const [deleteEntry] = useMutation(DELETE_ENTRY, {
        refetchQueries: [GET_ALL_ENTRIES, 'GetAllEntries'],
    })

    if (loading) return <Loader />
    if (error) return <div>Error :(</div>

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Container>
                <h1>My entries</h1>
                {data.map((singleEntry) => {
                    return (
                        <Box
                            display="flex"
                            justifyContent="center"
                            key={singleEntry._id}
                        >
                            <Stack direction="row" spacing={2}>
                                <TimePicker
                                    flex
                                    label="Start time"
                                    value="00:00"
                                    ampm={false}
                                    onChange={(newValue) => {
                                        setValue(newValue)
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                                <TimePicker
                                    label="End time"
                                    value="00:30"
                                    ampm={false}
                                    onChange={(newValue) => {
                                        setValue(newValue)
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Bundle"
                                    value={singleEntry.tag.tagBundle.name}
                                >
                                    <MenuItem
                                        value={singleEntry.tag.tagBundle.name}
                                    >
                                        {singleEntry.tag.tagBundle.name}
                                    </MenuItem>
                                </Select>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Tag"
                                    value={singleEntry.tag.name}
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
            </Container>
        </LocalizationProvider>
    )
}

export default Entries
