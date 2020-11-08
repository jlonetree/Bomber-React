import { combineReducers } from '@reduxjs/toolkit'
import { createStore } from 'redux'
import playerReducer from '../features/player/reducer'
import levelReducer from '../features/map/reducer'

const rootReducer = combineReducers({
    player: playerReducer,
    level: levelReducer,
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store