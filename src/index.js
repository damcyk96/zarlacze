import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from './context/getNewClient'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import App from './App'

// const getNewClient = (username) => {
//   const httpLink = createHttpLink({
//     uri: 'https://worklog-on-steroids.herokuapp.com/api/ql_open',
//   })

//   const authLink = setContext((_, { headers }) => {
//     return {
//       headers: {
//         ...headers,
//         'user-name': username ? username : '',
//       },
//     }
//   })

//   const client = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache(),
//   })
// }

const rootElement = document.getElementById('root')
ReactDOM.render(
  <StrictMode>
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  </StrictMode>,
  rootElement
)
