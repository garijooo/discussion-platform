import axios from 'axios';

import { authConfig } from '../../utils/requestConfigs';
import { UserActionTypes } from '../../types/user';
import {
    SIGN_IN,
    SIGN_OUT
} from './types';



export const signIn = (token: string | null) => async (dispatch: any)=> {
    try {
        if(!token) return dispatch({ type: UserActionTypes.USER_SIGNED_OUT });
        const { data } = await axios.get('/api/private/get/userdata', authConfig(token));
        const { user } = data;
        console.log(data);
        dispatch({
            type: UserActionTypes.USER_SIGNED_IN,
            payload: user
        });
    } catch(err) {
        console.log(err);
    }
}

export const signOut = () => {
    return {
        type: UserActionTypes.USER_SIGNED_OUT
    }
}