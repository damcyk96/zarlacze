import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import TimePicker from '@mui/lab/TimePicker'
import Loader from '../Loader'
import useAllEntries from '../../graphql/queries/useAllEntries/useAllEntries'

const Entries = () => {
    const { data, loading, error } = useAllEntries()
    const [value, setValue] = useState(null)

    if (loading) return <Loader />
    if (error) return <div>Error :(</div>

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div>
                <h1>My entries</h1>
                {data.map((singleEntry) => {
                    return (
                        <div key={singleEntry._id}>
                            <TimePicker
                                label="Basic example"
                                value={singleEntry.startTime}
                                ampm={false}
                                onChange={(newValue) => {
                                    setValue(newValue)
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                            <TimePicker
                                label="Basic example"
                                value={singleEntry.endTime}
                                ampm={false}
                                onChange={(newValue) => {
                                    setValue(newValue)
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                            <span> Tag: {singleEntry.tag.name}</span>
                        </div>
                    )
                })}
            </div>
        </LocalizationProvider>
    )
}

export default Entries
