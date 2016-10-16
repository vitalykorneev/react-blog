import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const enhancer = compose(
  applyMiddleware(thunkMiddleware)
)

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer)
}
