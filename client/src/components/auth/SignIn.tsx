import React, { FormEvent, useEffect, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signIn } from '../../store/actions';

import axios from 'axios';
import { baseConfig } from '../../utils/requestConfigs';

import { useCookies } from 'react-cookie';

import history from '../../histrory';

const SingIn:FC = () => {
    // states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [cookies, setCookie, removeCookie] = useCookies(['authtoken']);

    const dispatch = useDispatch();

    useEffect(() => {
        if(cookies['authtoken']) return history.push('/'); 
    }, []);


    const signInHandler = async (e: FormEvent<HTMLFormElement> | FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/auth/signin",{ email, password }, baseConfig);
            setCookie('authtoken', data.token, {
                maxAge: 20 * 60
            });
            dispatch(signIn(data.token));
            history.push('/');
        } catch(error){
            removeCookie('authtoken');
            setError(error.response.data.error);
        }
    }

    const homeClickHandler = () => {
        history.push('/');         
    }

    return (
        <div className="auth">
            <div className="auth__headings">
                <h1 className="auth__headings_first" onClick={homeClickHandler}>dis</h1>
                <h1 className="auth__headings_second" onClick={homeClickHandler}>Culture</h1>
            </div>
            <form className="auth__form form" onSubmit={signInHandler} >
                <h3 className="form__title">Sign in</h3>
                <div className="form__element">
                    <label htmlFor="email">E-mail:</label>
                    <input 
                        type="email" 
                        required placeholder="Enter e-mail" 
                        name="email"
                        id="email"   
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>  
                <div className="form__element">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        required placeholder="Enter password" 
                        name="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>        
                <div className="form__element form__subtext">
                    <input 
                        type="submit" 
                        name="submit"
                        value="Sign in"
                        onSubmit={signInHandler}
                    />
                    <span className="form__subtext_span">
                        <Link to="/auth/forgotpass">Forgot my password</Link>
                    </span> 
                </div>
                <div className="form__subtext">
                    <span className="form__subtext_span">
                        Do not have an account?<Link to="/auth/signup"> Sign up</Link>
                    </span>      
                </div> 
                <div className="form__error">
                    {error && `${error}` }
                </div>        
            </form>
        </div>
    );
}

export default SingIn;