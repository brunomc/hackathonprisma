import * as TERM_TYPES from '../types/termType'

const INITIAL_STATE = {
    terms:[]
}
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case TERM_TYPES.SET_TERMS:
            return { ...state, terms: action.payload }
        default:
            return state
    }
}