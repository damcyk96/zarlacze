import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'

import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { AddModalStateProvider } from './context/addModalOpen'
import { useClient, UserContext } from './context/getNewClient'

function App() {
  const history = useHistory()
  // const { client, username } = useClient()
  const { client, username } = useContext(UserContext)

  useEffect(() => {
    if (!username) {
      history.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ApolloProvider client={client}>
      <AddModalStateProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </AddModalStateProvider>
    </ApolloProvider>
  )
}

export default App
