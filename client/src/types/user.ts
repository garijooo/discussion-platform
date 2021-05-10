export enum UserActionTypes {
    USER_SIGNED_IN = 'USER_SIGNED_IN',
    USER_SIGNED_OUT = 'USER_SIGNED_OUT'
}

export interface UserState {
    id: string,
    username: string,
    email: string
}

export interface FetchUserAction {
    type: UserActionTypes.USER_SIGNED_IN,
    payload: {
        id: string,
        email: string,
        username: string
    }
}

export interface SignOutUserAction {
    type: UserActionTypes.USER_SIGNED_OUT
}

export interface States {
    user: UserState
}


export type UserAction = FetchUserAction | SignOutUserAction;