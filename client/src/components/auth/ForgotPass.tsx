import axios from 'axios';
import React from 'react';
import history from '../../histrory';

class ForgotPass extends React.Component {
    state = { email: null, error: null, success: null };

    forgotPassHandler = async e => {
        e.preventDefault();
        const config = {
            header: {
                "Content-Type":"application/json"
            },
        };
        try {
            const { data } = await axios.post(
                "/api/auth/forgotpass",
                { email: this.state.email },
                config
            );
            this.setState({ success: data.data, error: null });
            //history.push('/');
        } catch(error) {
            this.setState({ error: error.response.data.error, email: null, success: null });
        }

    }

    render() {
        return (
        <div className="auth-screen">
            <form className="auth-screen__form" 
                onSubmit={e => this.forgotPassHandler(e)}
            >
                <h3 className="auth-screen__title">Forgot password</h3>
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
                    <input 
                        type="submit" 
                        name="submit"
                        value="Send an email"
                        onClick={e => this.forgotPassHandler(e)}
                    />
                    <div className="auth-screen__form__error">
                        {this.state.error && `Error: ${this.state.error}` }
                        {this.state.success && `Success: ${this.state.success}` }
                    </div>
                </div>             
            </form>
        </div>
        )
    }
}

export default ForgotPass;