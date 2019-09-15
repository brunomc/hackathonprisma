import hackathonType from '../types/hackathonType'

export const changeHackathon = (data) => {
    return {
        type: hackathonType.CHANGED_HACKATHONS,
        payload: data
    }
}

export const setHackathon = (data) => {
    return {
        type: hackathonType.SET_HACKATHON,
        payload: data
    }
}