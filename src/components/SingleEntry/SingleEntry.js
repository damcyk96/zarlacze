import React, { useState } from 'react'
import { TextField, MenuItem, Select, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { format } from 'date-fns'
import { TimePicker } from '@mui/lab'

export default function SingleEntry({ singleEntry }) {
  const [startValue, setStartValue] = useState(singleEntry.startTime)
  const [endValue, setEndValue] = useState(singleEntry.endTime)
  console.log(singleEntry)

  return (
    <>
      <TimePicker
        flex
        label="Start time"
        value={startValue}
        ampm={false}
        onChange={(newValue) => {
          setStartValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <TimePicker
        label="End time"
        value={endValue}
        ampm={false}
        minTime={startValue}
        onChange={(newValue) => {
          setEndValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Bundle"
        value={singleEntry.tag?.tagBundle.name}
      >
        <MenuItem value={singleEntry.tag?.tagBundle.name}>
          {singleEntry.tag?.tagBundle.name}
        </MenuItem>
      </Select>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Tag"
        value={singleEntry.tag?.name}
      >
        <MenuItem value={singleEntry.tag?.name}>
          {singleEntry.tag?.name}
        </MenuItem>
      </Select>
    </>
  )
}
