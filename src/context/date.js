import { useState } from 'react'
import { createContainer } from 'unstated-next'

const useDateStateContainer = createContainer(() => {
    const [pickedDate, setPickedDate] = useState(new Date())

    return {
        pickedDate,
        setPickedDate,
    }
})

export const DateStateProvider = useDateStateContainer.Provider;
export const dateState = useDateStateContainer.useContainer;