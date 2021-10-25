import { Container } from '@mui/material'
import React from 'react'
import ChooseDate from '../../components/ChooseDate/ChooseDate'
import Entries from '../../components/Entries/Entries'
import { DateStateProvider } from '../../context/date'

const EntriesWithDatePicker = () => {
  return (
    <Container>
      <DateStateProvider>
        <ChooseDate />
        <Entries />
      </DateStateProvider>
    </Container>
  )
}

export default EntriesWithDatePicker
