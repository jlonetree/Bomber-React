import { combineReducers } from '@reduxjs/toolkit'
import { createStore } from 'redux'
import playerReducer from '../features/player/reducer'
import mapReducer from '../features/map/reducer'
//
// const decrement = () => {
//     return{
//         type: 'DECREMENT'
//     }
// }

const bombReducer = (state = 7, action) => {
    switch(action.type) {
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}
//
const rootReducer = combineReducers({
    player: playerReducer,
    map: mapReducer,
    bomb: bombReducer
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store