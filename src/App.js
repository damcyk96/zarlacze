import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useContext, useEffect } from 'react'

import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { AddModalStateProvider } from './context/addModalOpen'
import { UserContext } from './context/getNewClient'

function App() {
  const history = useHistory()

  const { username } = useContext(UserContext)

  useEffect(() => {
    if (!username) {
      history.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AddModalStateProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </AddModalStateProvider>
  )
}

export default App
