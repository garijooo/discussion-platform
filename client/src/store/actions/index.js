import {
    SIGN_IN,
    SIGN_OUT
} from './types';

export const signIn = (_id, email, username) => {
    return {
        type: SIGN_IN,
        payload: {
            _id,
            username,
            email
        }
    };
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}