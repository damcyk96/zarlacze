import React from 'react'
import ChooseDate from '../components/ChooseDate/ChooseDate'
import Entries from '../components/Entries/Entries'
import { DateStateProvider } from '../context/date'

const EntriesWithDatePicker = () => {
    return (
        <DateStateProvider>
            <ChooseDate />
            {/* <Entries /> */}
        </DateStateProvider>
    )
}

export default EntriesWithDatePicker
