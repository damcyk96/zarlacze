import { useState } from 'react'
import { createContainer } from 'unstated-next'

const useDetailsModalStateContainer = createContainer(() => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [bundleId, setBundleId] = useState('')

  return {
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    bundleId,
    setBundleId,
  }
})

export const DetailsModalStateProvider = useDetailsModalStateContainer.Provider
export const detailsModalState = useDetailsModalStateContainer.useContainer
