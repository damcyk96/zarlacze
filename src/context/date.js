import { useState } from 'react'
import { createContainer } from 'unstated-next'

const useDateStateContainer = createContainer(() => {
    const [pickedDate, setPickedDate] = useState(new Date())
    

    // useEffect(() => {
    //     setowac dzien, miesiac, rok i wedlug tego robic zapytnaie o entries z filtrem
        
    // }, [input])

    return {
        pickedDate,
        setPickedDate,
    }
})

export const DateStateProvider = useDateStateContainer.Provider;
export const dateState = useDateStateContainer.useContainer;