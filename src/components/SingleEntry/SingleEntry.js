import React, { useState } from 'react'
import { TextField, MenuItem, Select } from '@mui/material'
import { TimePicker } from '@mui/lab'

export default function SingleEntry({ singleEntry }) {
  let dateObj = undefined
  let dateObjEnd = undefined

  if (singleEntry.startTime) {
    const startValues = singleEntry.startTime.split(':')
    dateObj = new Date(singleEntry.createdAt)
    dateObj.setHours(startValues[0])
    dateObj.setMinutes(startValues[1])
  }

  if (singleEntry.endTime) {
    const endValues = singleEntry.endTime.split(':')
    dateObjEnd = new Date(singleEntry.createdAt)
    dateObjEnd.setHours(endValues[0])
    dateObjEnd.setMinutes(endValues[1])
  }

  const [startValue, setStartValue] = useState(dateObj)
  const [endValue, setEndValue] = useState(dateObjEnd)

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
        value={endValue || startValue}
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
