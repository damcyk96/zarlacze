import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { AddModalStateProvider } from './context/addModalOpen'

function App() {
  const history = useHistory()

  useEffect(() => {
    if (!localStorage.getItem('user-name')) {
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
