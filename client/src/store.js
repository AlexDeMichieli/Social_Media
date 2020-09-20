import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

//react-router-dom redux react-redux-thunk redux-devtools-extension 
const initialState = {}

const middleware = [thunk]

const store = createStore (
    rootReducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store