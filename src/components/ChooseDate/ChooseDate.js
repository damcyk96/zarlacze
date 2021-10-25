import React from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import Button from '@mui/material/Button'
import { add } from 'date-fns'
import { dateState } from './../../context/date'
import { Box } from '@mui/system'

const ChooseDate = () => {
  const { pickedDate, setPickedDate } = dateState()

  const maxDay = new Date().toDateString()

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box display="flex" justifyContent="center">
        <Stack spacing={2} direction="row">
          <Button
            variant="text"
            onClick={() => {
              setPickedDate(
                add(pickedDate, {
                  years: 0,
                  months: 0,
                  weeks: 0,
                  days: -1,
                  hours: 0,
                  minutes: 0,
                  seconds: 0,
                })
              )
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
            disabled={pickedDate.toDateString() === maxDay}
            onClick={() => {
              setPickedDate(
                add(pickedDate, {
                  years: 0,
                  months: 0,
                  weeks: 0,
                  days: 1,
                  hours: 0,
                  minutes: 0,
                  seconds: 0,
                })
              )
            }}
          >
            <NavigateNextIcon />
          </Button>
        </Stack>
        </Box>
      </LocalizationProvider>
    </div>
  )
}

export default ChooseDate
