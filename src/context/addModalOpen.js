import { useState } from 'react'
import { createContainer } from 'unstated-next'

const useAddModalStateContainer = createContainer(() => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isAddEntryModalOpen, setIsAddEntryModalOpen] = useState()

  return {
    isAddModalOpen,
    setIsAddModalOpen,
    isAddEntryModalOpen,
    setIsAddEntryModalOpen
   
  }
})

export const AddModalStateProvider = useAddModalStateContainer.Provider
export const addModalState = useAddModalStateContainer.useContainer
