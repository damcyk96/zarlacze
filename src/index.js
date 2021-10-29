import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextWrapper } from './context/getNewClient'

import App from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <StrictMode>
    <UserContextWrapper>
      <Router>
        <App />
      </Router>
    </UserContextWrapper>
  </StrictMode>,
  rootElement
)
