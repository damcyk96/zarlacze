import { useState } from 'react'
import { createContainer } from 'unstated-next'

const useModalStateContainer = createContainer(() => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  console.log(isOpen)

  return {
    isOpen,
    setIsOpen,
    handleClose,
    handleOpen,
  }
})

export const ModalStateProvider = useModalStateContainer.Provider
export const modalState = useModalStateContainer.useContainer
