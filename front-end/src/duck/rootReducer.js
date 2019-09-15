import { combineReducers } from 'redux'
import AuthReducer from './reducers/authReducer'
import UserReducer from './reducers/userReducer'
import TermReducer from './reducers/termReducer'
import HackathonReducer from './reducers/hackathonReducer'
const rootReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    term: TermReducer,
    hackathon: HackathonReducer
})

export default rootReducer