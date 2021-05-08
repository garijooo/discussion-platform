import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import history from '../../histrory';
//styles
import '../../styles/auth-screen.css';

class SingUp extends React.Component {
    state = { username: null, email: null, password: null, confirmPassword: null, error: null };

    signUpHandler = async (e) => {
        e.preventDefault();
 
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        if(this.state.password !== this.state.confirmPassword) 
        return this.setState({ password: null, confirmPassword: null, error: 'Passwords do not match'});
        
        try {
            const { data } = await axios.post(
                "/api/auth/signup",
                { username: this.state.username, email: this.state.email, password: this.state.password},
                config
            );

            localStorage.setItem("authtoken", data.token);

            history.push('/');
        } catch(error){
            this.setState({ error: error.response.data.error });
        }

    }

    render() {
        return (
            <div className="auth-screen">
                <form className="auth-screen__form" 
                    onSubmit={this.signUpHandler}
                >
                    <h3 className="auth-screen__title">Sign up</h3>
                    <div className="auth-screen__form__element">
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            required placeholder="Enter username" 
                            name="username"
                            id="username"

                            onChange={e => this.setState({ username: e.target.value })}
                        />
                    </div>
                    <div className="auth-screen__form__element">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            required placeholder="Enter email" 
                            name="email"
                            id="email"

                            onChange={e => this.setState({ email: e.target.value })}
                        />
                    </div>  
                    <div className="auth-screen__form__element">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            required placeholder="Enter password" 
                            name="password"
                            id="password"

                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </div>     
                    <div className="auth-screen__form__element">
                        <label htmlFor="confirmPassword">Confirm password:</label>
                        <input 
                            type="password" 
                            required placeholder="Confirm password" 
                            name="confirmPassword"
                            id="confirmPassword"

                            onChange={e => this.setState({ confirmPassword: e.target.value })}
                        />
                    </div>      
                    <div className="auth-screen__form__element">
                        <input 
                            type="submit" 
                            name="submit"
                            value="Sign up"
                            onClick={this.signUpHandler}
                        />
                        <div className="auth-screen__form__error">
                            {this.state.error && `${this.state.error}` }
                        </div>
                    </div>
                    <span className="auth-screen__subtext">
                        Already have an account? 
                        <Link to="/auth/signin">Sign in</Link>
                    </span>                
                </form>
            </div>
        )
    }
}

export default SingUp;