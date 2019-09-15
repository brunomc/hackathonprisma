import React from 'react'

import { useRoutes } from 'hookrouter'
import { routes } from './config/routes'
import { ApolloProvider } from '@apollo/react-hooks';
import client from './graphql/client'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import reducers from './duck/rootReducer'


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)

const App = () => {

  const routeResult = useRoutes(routes) || <h1>Page not found</h1>

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        {routeResult}
      </ApolloProvider>
    </Provider>
  )
}

export default App