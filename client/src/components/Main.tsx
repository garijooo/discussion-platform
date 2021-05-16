import React, { useEffect, useState, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, signOut } from '../store/actions';

import axios from 'axios';
import { UserState, States } from '../types/user';
import { authConfig } from '../utils/requestConfigs'

import { useCookies } from 'react-cookie';

import history from '../histrory';

import Header from './Header';

const Main:FC = () => {
    const id = useSelector((state: States): string => state.user.id);
    const email = useSelector((state: States): string => state.user.email);
    const username = useSelector((state: States): string => state.user.username);

    const [cookies, setCookie, removeCookie] = useCookies(['authtoken']);

    const dispatch = useDispatch();

    useEffect(() => {
        // if(!localStorage.getItem("authtoken")) return history.push('/auth/signin'); 
        fetchPrivateData();
        // console.log(`cookies ${cookies['authtoken']}`);
    }, []);

    const fetchPrivateData = async () => {
        try {
            if(cookies['authtoken'] && ! username) dispatch(signIn(cookies['authtoken']));
        } catch(error: any) {
            removeCookie('authtoken');
        }
    }

    return (
        <div>
            <Header />
                {username && `Your username is: ${username}`}
        </div>
    );
}

export default Main;