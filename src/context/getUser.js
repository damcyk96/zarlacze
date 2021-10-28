import { useState } from 'react'
import { createContainer } from 'unstated-next'

const useGetUsersContainer = createContainer(() => {
  const [userName, setUserName] = useState(localStorage.getItem('user-name'))

  return {
    userName,
    setUserName,
  }
})

export const GetUsersProvider = useGetUsersContainer.Provider
export const GetUsers = useGetUsersContainer.useContainer
