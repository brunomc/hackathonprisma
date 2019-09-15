import * as USER_TYPES from '../types/userType'

export const setUser = (data) => {
    return {
        type: USER_TYPES.SET_USER,
        payload: data
    }
}

export const subscribeUserHackathon = (data) => {
    return {
        type: USER_TYPES.USER_SUBSCRIBE_HACKATHON,
        payload: data
    }
}

