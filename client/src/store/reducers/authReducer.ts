import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    _id: null,
    email: null,
    username: null
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            return { ...state, 
                _id: action.payload._id, 
                email: action.payload.email, 
                username: action.payload.username
            };
        case SIGN_OUT:
            return { ...state, 
                _id: null, 
                email: null, 
                username: null
            };
        default:
            return state;
    }
}