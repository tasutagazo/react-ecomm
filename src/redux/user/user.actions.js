import {userConfig} from './user.types';

export const setCurrentUser = user => ({
    type: userConfig.SET_CURRENT_USER,
    payload: user
});