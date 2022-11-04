import { combineReducers, configureStore } from '@reduxjs/toolkit'
import professionsReduser from './professions'
import qualitiesReducer from './qualities'

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReduser
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
