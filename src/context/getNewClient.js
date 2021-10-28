import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import React, { createContext, useContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = UserContext.Provider

export const UserContextWrapper = ({ children }) => {
  const [username, setUsername] = useState(
    localStorage.getItem('user-name') || ''
  )

  const setProviderStorage = (providername) => {
    localStorage.setItem('user-name', providername)
    setUsername(providername)
  }

  const removeProviderStorage = () => {
    localStorage.removeItem('user-name')
    setUsername('')
  }

  const httpLink = createHttpLink({
    uri: 'https://worklog-on-steroids.herokuapp.com/api/ql_open',
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        'user-name': username ? username : '',
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return (
    <UserContext.Provider
      value={{ setProviderStorage, client, username, removeProviderStorage }}
    >
      {children}
    </UserContext.Provider>
  )
}

// export const useClient = () => {
//   return useContext(UserContext)
// }
