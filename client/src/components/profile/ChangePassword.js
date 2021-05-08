import React from 'react';
//css styles below:
import '../../styles/auth.css'

class ChangePassword extends React.Component {
    render() {
        return (
            <div className="auth-screen">
                <form className="auth-screen__form" 
                    onSubmit={e => this.forgotPassHandler(e)}
                >
                    <h3 className="auth-screen__title">New password:</h3>
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
                    </div>
            </form>
        </div>
        )
    }
}

export default ChangePassword;