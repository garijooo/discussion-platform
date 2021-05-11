import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, signOut } from '../store/actions';

import { UserState, States } from '../types/user';
import { authConfig } from '../utils/requestConfigs'
import history from '../histrory';

import Header from './Header';

const Main = () => {
    const id = useSelector((state: States) => state.user.id);
    const email = useSelector((state: States ) => state.user.email);
    const username = useSelector((state: States ) => state.user.username);

    const dispatch = useDispatch();

    useEffect(() => {
        // if(!localStorage.getItem("authtoken")) return history.push('/auth/signin'); 
        // if(!id) fetchPrivateData();
    }, []);

    const fetchPrivateData = async () => {
        try {
            dispatch(signIn(localStorage.getItem("authtoken")));
        } catch(error: any) {
            localStorage.removeItem("authtoken");
        }
    }

    const signOutHandler = () => {
        dispatch(signOut);
        localStorage.removeItem("authtoken");
        history.push('/auth/signin'); 
    }

    return (
        <div>
            <Header />
            Your username is: 
            {
            `   ${username}`
            }
            <button onClick={signOutHandler}>Exit</button>
        </div>
    );
}

export default Main;