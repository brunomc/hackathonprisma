import * as AUTH_TYPES from '../types/authType';
import * as userTypes from '../types/userType';
import * as userActions from './userAction';
import { navigate } from 'hookrouter';
export const authenticate = (data) => {
    if (data.authenticate !== undefined && data.authenticate.token !== undefined) {
        return {
            type: AUTH_TYPES.AUTHENTICATED,
            payload: data.authenticate.token
        }
    } else {
        if (data.authenticate.errors) {
            return {
                type: AUTH_TYPES.ERROR,
                payload: data.authenticate.errors.message
            }
        }
    }

}
export const checkToken = (data) => {
    if (data.errors) {
        return {
            type: AUTH_TYPES.IS_VALID_TOKEN,
            payload: false
        }
    }

    return dispatch => {
        dispatch({
            type: AUTH_TYPES.IS_VALID_TOKEN,
            payload: true
        })
        dispatch({
            type: userTypes.SET_USER,
            payload: data
        })
    }
}
export const logout = () => {
    navigate('/login')
    return ({
        type: AUTH_TYPES.LOGOUT
    }
    );
}