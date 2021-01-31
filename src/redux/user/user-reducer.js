import {userConfig} from './user.types';
const INITIAL_STATE = {
    currentUser: null,
    error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case userConfig.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case userConfig.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }
        case userConfig.SIGN_IN_FAIL:
        case userConfig.SIGN_OUT_FAILURE:
        case userConfig.SIGN_UP_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default userReducer