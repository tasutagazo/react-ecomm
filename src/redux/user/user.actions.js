import {userConfig} from './user.types';

export const setCurrentUser = user => ({
    type: userConfig.SET_CURRENT_USER,
    payload: user
});

export const GoogleSignInStart = () => ({
    type: userConfig.GOOGLE_SIGN_IN_START
})

export const SignInSuccess = (user) => ({
    type: userConfig.SIGN_IN_SUCCESS,
    payload: user
})

export const SignInFailure = (error) => ({
    type: userConfig.SIGN_IN_FAIL,
    payload: error
})

export const EmailSignInStart = (emailAndPassword) => ({
    type: userConfig.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
})

export const checkUserSession = () => ({
    type: userConfig.CHECK_USER_SESSION
})

export const signOutStart = () => ({
    type: userConfig.SIGN_OUT_START
});

export const signOutSuccess = () => ({
    type: userConfig.SIGN_OUT_SUCCESS
});

export const signOutFailure = (error) => ({
    type: userConfig.SIGN_OUT_FAILURE,
    payload: error
});

export const signUpStart = (userDetails) => ({
    type: userConfig.SIGN_UP_START,
    payload: userDetails
})

export const signUpSuccess = ({user, additionalData}) => ({
    type: userConfig.SIGN_UP_SUCCESS,
    payload: {user, additionalData}
})

export const signUpFail = (error) => ({
    type: userConfig.SIGN_UP_FAIL,
    payload: error
})

