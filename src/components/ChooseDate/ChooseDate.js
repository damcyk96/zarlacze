import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import Button from '@mui/material/Button'
import moment from 'moment'
import { dateState } from './../../context/date'

const ChooseDate = () => {
  const { pickedDate, setPickedDate } = dateState()

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={2} direction="row">
          <Button
            variant="text"
            onClick={() => {
              setPickedDate(moment().add(-1, 'days'))
            }}
          >
            <NavigateBeforeIcon />
          </Button>

          <DatePicker
            label="Choose a date"
            mask="__. ____ ____"
            maxDate={new Date()}
            value={pickedDate}
            showTodayButton
            onChange={(newPickedValue) => {
              setPickedDate(newPickedValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button
            variant="text"
            onClick={() => {
              setPickedDate(moment().add(1, 'days'))
            }}
          >
            <NavigateNextIcon />
          </Button>
        </Stack>
      </LocalizationProvider>
    </div>
  )
}

export default ChooseDate
