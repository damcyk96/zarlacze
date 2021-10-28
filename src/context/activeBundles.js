import { useState, useEffect } from 'react'
import { createContainer } from 'unstated-next'
import useGetActiveBundles from '../graphql/queries/useGetActiveBundles'

const useActiveBundlesStateContainer = createContainer(() => {
  const [activeBundles, setActiveBundles] = useState()
  const { data, loading, error } = useGetActiveBundles()

  useEffect(() => {
    setActiveBundles(data)
  }, [data])

  return {
    activeBundles,
    setActiveBundles,
  }
})

export const ActiveBundlesStateProvider =
  useActiveBundlesStateContainer.Provider
export const activeBundlesState = useActiveBundlesStateContainer.useContainer
