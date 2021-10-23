import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import App from './App'

const client = new ApolloClient({
    uri: 'https://worklog-on-steroids.herokuapp.com/api/ql_open',
    cache: new InMemoryCache(),
})

const rootElement = document.getElementById('root')
ReactDOM.render(
    <StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </StrictMode>,
    rootElement
)
