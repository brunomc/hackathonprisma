import hackathonType from '../types/hackathonType'

const INITIAL_STATE = {
    hackathons: [],
    hackathon: {
        id: 'ck0d3w0z53a1c0b53tm7m46h1',
        name: '',
        start: '',
        end: '',
        maxParticipants: 0,
        participants: [],
        squads: [],
        terms: [],
        award: []
    }
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case hackathonType.SET_HACKATHON:
            return { ...state, hackathon: action.payload }
        case hackathonType.CHANGED_HACKATHONS:
            return { ...state, hackathons: action.payload }
        default:
            return state
    }
}