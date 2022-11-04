import { createSlice } from '@reduxjs/toolkit'
import professionService from '../services/profession.service'

const professionsSlice = createSlice({
    name: 'professions',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true
        },
        professionsReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: professionsReduser, actions } = professionsSlice
const { professionsRequested, professionsReceved, professionsRequestFailed } =
    actions

export const loadProfessionsList = () => async (dispatch) => {
    dispatch(professionsRequested())
    try {
        const { content } = await professionService.get()
        dispatch(professionsReceved(content))
    } catch (error) {
        dispatch(professionsRequestFailed(error.message))
    }
}

export const getProfessions = () => (state) => state.professions.entities
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading

export default professionsReduser
