import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import reducer from '../Reducers/Reducers'

const loggerMiddleware = createLogger()

export default function configureStore(initialState) {
  return createStore(
    reducer,
    applyMiddleware(
      loggerMiddleware
    )
  )
};
