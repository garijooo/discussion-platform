import React from 'react';
import axios from 'axios';
import history from '../../histrory';
import { Link } from 'react-router-dom';

class ResetPass extends React.Component {
    state = { password: "", confirmPassword: "", success: "", error: "" };

    resetPasswordHandler = async e => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        if(this.state.password !== this.state.confirmPassword) return this.setState({ error: 'Passwords do not match'});
        try {
            
            const { data } = await axios.put(
                `/api/auth/resetpass/${this.props.match.params.resetToken}`,
                {
                    password: this.state.password
                },
                config
            );
            console.log(`data: ${data.data}`);
            this.setState({ error: "", success: data.data});
        }
        catch (error) {
            console.log(error);
            this.setState({ 
                error: error.response.data.error, 
                success: "" 
            });
        }
    }

    render() {
        return (
            <div className="auth-screen">
                <form className="auth-screen__form" 
                    onSubmit={this.resetPasswordHandler}
                >
                    <h3 className="auth-screen__title">Enter new password</h3>
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
                            value="Update"
                            onClick={this.resetPasswordHandler}
                        />
                        <div className="auth-screen__form__error">
                            {this.state.error && `Error: ${this.state.error}` }
                        </div>
                        {
                        this.state.success && (
                        <span className="auth-screen__subtext">
                            {`Success: ${this.state.success}`} 
                            <Link to="/auth/signin">Sign in</Link>
                        </span>  
                        )}
                        
                    </div>              
                </form>
            </div>
        )
    }
}

export default ResetPass;