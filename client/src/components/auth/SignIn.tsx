import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signIn } from '../../store/actions';

import axios from 'axios';
import { baseConfig } from '../../utils/requestConfigs';

import history from '../../histrory';

const SingIn = () => {
    // states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    //
    // const id = useSelector((state: States) => state.user.id);
    // const email = useSelector((state: States ) => state.user.email);
    // const username = useSelector((state: States ) => state.user.username);
    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem("authtoken")) return history.push('/'); 
    }, []);


    const signInHandler = async (e: any) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/auth/signin",{ email, password }, baseConfig);
            localStorage.setItem("authtoken", data.token);
            dispatch(signIn(data.token));
            history.push('/');
        } catch(error){
            localStorage.removeItem("authtoken");
            setError(error.response.data.error);
        }
    }
    return (
        <div className="auth">
            <div className="auth__headings">
                <h1 className="auth__headings_first">dis</h1>
                <h1 className="auth__headings_second">Culture</h1>
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