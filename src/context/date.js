import { useState, useEffect } from 'react'
import { createContainer } from 'unstated-next'
import { format } from 'date-fns'

const useDateStateContainer = createContainer(() => {
  const [pickedDate, setPickedDate] = useState(new Date())
  const [dateQueryFormat, setDateQueryFormat] = useState(new Date())

  useEffect(() => {
    const queryFormat = format(pickedDate, 'yyyy-M-d')
    setDateQueryFormat(queryFormat + 'T00:00:00.000Z')
  }, [pickedDate])

  return {
    pickedDate,
    setPickedDate,
    dateQueryFormat,
    setDateQueryFormat,
  }
})

export const DateStateProvider = useDateStateContainer.Provider
export const dateState = useDateStateContainer.useContainer
