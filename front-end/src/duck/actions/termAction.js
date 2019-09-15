import * as TERM_TYPES from '../types/termType'

export const setTerms = (data) => {
    return {
        type: TERM_TYPES.SET_TERMS,
        payload: data
    }
}


