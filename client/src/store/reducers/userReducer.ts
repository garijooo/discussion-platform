import { UserState, UserAction, UserActionTypes } from '../../types/user';

const INITIAL_STATE: UserState = {
    id: '',
    email: '',
    username: ''
};

export default (state = INITIAL_STATE, action: UserAction) => {
    switch(action.type) {
        case UserActionTypes.USER_SIGNED_IN:
            console.log({ ...state, 
                id: action.payload.id, 
                email: action.payload.email, 
                username: action.payload.username
            });
            return { ...state, 
                id: action.payload.id, 
                email: action.payload.email, 
                username: action.payload.username
            };
        case UserActionTypes.USER_SIGNED_OUT:
            return { ...state, 
                id: '', 
                email: '', 
                username: ''
            };
        default:
            return state;
    }
}