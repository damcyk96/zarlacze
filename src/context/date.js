import { useState, useEffect } from 'react'
import { createContainer } from 'unstated-next'
import moment from 'moment'

const useDateStateContainer = createContainer(() => {
    const [pickedDate, setPickedDate] = useState(new Date())
    const [dateQueryFormat, setDateQueryFormat] = useState('')

    useEffect(() => {
        const queryFormat = moment(pickedDate).format('YYYY-MM-DD')
        setDateQueryFormat(queryFormat+'T00:00:00.000Z')
    }, [])

    return {
        pickedDate,
        setPickedDate,
        dateQueryFormat,
        setDateQueryFormat,
    }
})

export const DateStateProvider = useDateStateContainer.Provider
export const dateState = useDateStateContainer.useContainer
