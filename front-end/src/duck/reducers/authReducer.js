import * as AUTH_TYPES from '../types/authType'
import { navigate } from 'hookrouter';

const TOKEN_KEY = 'token'

const INITIAL_STATE = {
    token: "",
    error: "",
    checkedToken: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_TYPES.AUTHENTICATED:
            localStorage.setItem(TOKEN_KEY, "Bearer " + action.payload)
            return { ...state, token: action.payload, checkedToken: true }
        case AUTH_TYPES.LOGOUT:
            localStorage.removeItem(TOKEN_KEY)
            return { ...state, token: '' }
        case AUTH_TYPES.IS_VALID_TOKEN:
            return { ...state, checkedToken: action.payload }
        case AUTH_TYPES.ERROR:
            localStorage.removeItem(TOKEN_KEY)
            return { ...state, error: action.payload }
        default:
            return state
    }
}