import { useState } from 'react'
import { createContainer } from 'unstated-next'

const useDetailsModalStateContainer = createContainer(() => {
  const [bundleId, setBundleId] = useState('')

  return {
    bundleId,
    setBundleId,
  }
})

export const DetailsModalStateProvider = useDetailsModalStateContainer.Provider
export const detailsModalState = useDetailsModalStateContainer.useContainer
