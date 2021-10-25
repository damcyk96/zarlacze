import { useState } from 'react'
import { createContainer } from 'unstated-next'

const useAddModalStateContainer = createContainer(() => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return {
    isAddModalOpen,
    setIsAddModalOpen
   
  }
})

export const AddModalStateProvider = useAddModalStateContainer.Provider
export const addModalState = useAddModalStateContainer.useContainer
