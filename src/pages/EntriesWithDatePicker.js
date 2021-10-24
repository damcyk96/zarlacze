import React from 'react'
import ChooseDate from '../components/ChooseDate/ChooseDate'
import Entries from '../components/Entries/Entries'
import { DateStateProvider } from '../context/date'

const EntriesWithDatePicker = () => {
<<<<<<< HEAD
  return (
    <DateStateProvider>
      <ChooseDate />
      <Entries />
    </DateStateProvider>
  )
=======
    return (
        <DateStateProvider>
            <ChooseDate />
            {/* <Entries /> */}
        </DateStateProvider>
    )
>>>>>>> 50c69b0a072883ab9594260524d614202f8894fe
}

export default EntriesWithDatePicker
