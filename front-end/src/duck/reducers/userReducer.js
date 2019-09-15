import * as USER_TYPES from '../types/userType'

const INITIAL_STATE = {
    user: {
        id: "",
        name: "",
        email: "",
        participant: [],
        createdHackathon: [],
        squads: []
    }
}
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case USER_TYPES.SET_USER:
            return { ...state, user: action.payload }
        case USER_TYPES.USER_SUBSCRIBE_HACKATHON:
            return { ...state, user: { participants: [...state.user.participant, { id: action.payload }] } }
        default:
            return state
    }
}