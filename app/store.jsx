import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/posts-reducer'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk' 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, createLogger({collapsed: true}))));