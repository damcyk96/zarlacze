import React, { useState } from 'react'
import { TextField, MenuItem, Select } from '@mui/material'
import { format } from 'date-fns'
import { TimePicker } from '@mui/lab'

export default function SingleEntry({ singleEntry }) {
  const [startValue, setStartValue] = useState(new Date(singleEntry.createdAt))
  const [endValue, setEndValue] = useState(singleEntry.endTime || undefined)
  console.log(singleEntry.createdAt, new Date(singleEntry.createdAt))
  console.log('start', startValue)

  const minTime = new Date(singleEntry.createdAt)

  return (
    <>
      <TimePicker
        flex
        label="Start time"
        value={startValue}
        ampm={false}
        onChange={(newValue) => {
          console.log(newValue)
          setStartValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <TimePicker
        label="End time"
        value={endValue || startValue}
        ampm={false}
        minTime={startValue && new Date(startValue)}
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
        style={{ minWidth: '12rem' }}
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
        style={{ minWidth: '12rem' }}
      >
        <MenuItem value={singleEntry.tag?.name}>
          {singleEntry.tag?.name}
        </MenuItem>
      </Select>
    </>
  )
}
