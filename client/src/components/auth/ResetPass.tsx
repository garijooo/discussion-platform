import React, { useState, FC, FormEvent } from 'react';
import history from '../../histrory';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { baseConfig } from '../../utils/requestConfigs';

const ResetPass:FC = (props: any) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const resetPasswordHandler = async (e: FormEvent<HTMLFormElement> | FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(password !== confirmPassword) return setError('Passwords do not match');
        try {
            const { data } = await axios.put(`/api/auth/resetpass/${props.match.params.resetToken}`,{ password }, baseConfig);
            setError('');
            setSuccess(data.data);
        }
        catch (error) {
            setError(error.response.data.error);
            setSuccess('');
        }
    }

    const homeClickHandler = () => {
        history.push('/');         
    }

    return(
        <div className="auth">
            <div className="auth__headings">
                <h1 className="auth__headings_first" onClick={homeClickHandler}>dis</h1>
                <h1 className="auth__headings_second" onClick={homeClickHandler}>Culture</h1>
            </div>
            <form className="auth__form form" onSubmit={resetPasswordHandler} >
                <h3 className="form__title">Enter new password</h3>
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
                <div className="form__element">
                    <label htmlFor="confirmPassword">Confirm password:</label>
                    <input 
                        type="password" 
                        required placeholder="Confirm password" 
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>      
                <div className="form__element form__subtext">
                    <input 
                        type="submit" 
                        name="submit"
                        value="Update"
                        onSubmit={resetPasswordHandler}
                    />
                    <span className="form__subtext_span">
                    {success && (<>{success} <Link to="/auth/signin">Sign in</Link> </>)}
                    </span>  
                </div>  
                <div className="form__error">
                    {error && `${error}` }
                </div>
            </form>
        </div>
    );
}

export default ResetPass;
// interface Props {
//     match: any,
//     params: any
// }

// interface State {
//     password: string,
//     confirmPassword: string,
//     success: string,
//     error: string
// }

// class ResetPass extends React.Component<Props & RouteProps, State> {
//     state = { password: "", confirmPassword: "", success: "", error: "" };

//     resetPasswordHandler = async (e: any) => {
//         e.preventDefault();

//         const config = {
// headers: {
//                 "Content-Type": "application/json"
//             }
//         };

//         if(this.state.password !== this.state.confirmPassword) return this.setState({ error: 'Passwords do not match'});
//         try {
//             const { data } = await axios.put(
//                 `/api/auth/resetpass/${this.props.match.params.resetToken}`,
//                 {
//                     password: this.state.password
//                 },
//                 config
//             );
//             console.log(`data: ${data.data}`);
//             this.setState({ error: "", success: data.data});
//         }
//         catch (error) {
//             console.log(error);
//             this.setState({ 
//                 error: error.response.data.error, 
//                 success: "" 
//             });
//         }
//     }

//     render() {
//         return (
//             <div className="auth-screen">
//                 <form className="auth-screen__form" 
//                     onSubmit={this.resetPasswordHandler}
//                 >
//                     <h3 className="auth-screen__title">Enter new password</h3>
//                     <div className="auth-screen__form__element">
//                         <label htmlFor="password">Password:</label>
//                         <input 
//                             type="password" 
//                             required placeholder="Enter password" 
//                             name="password"
//                             id="password"
//                             onChange={e => this.setState({ password: e.target.value })}
//                         />
//                     </div>     
//                     <div className="auth-screen__form__element">
//                         <label htmlFor="confirmPassword">Confirm password:</label>
//                         <input 
//                             type="password" 
//                             required placeholder="Confirm password" 
//                             name="confirmPassword"
//                             id="confirmPassword"
//                             onChange={e => this.setState({ confirmPassword: e.target.value })}
//                         />
//                     </div>      
//                     <div className="auth-screen__form__element">
//                         <input 
//                             type="submit" 
//                             name="submit"
//                             value="Update"
//                             onClick={this.resetPasswordHandler}
//                         />
//                         <div className="auth-screen__form__error">
//                             {this.state.error && `Error: ${this.state.error}` }
//                         </div>
//                         {
//                         this.state.success && (
//                         <span className="auth-screen__subtext">
//                             {`Success: ${this.state.success}`} 
//                             <Link to="/auth/signin">Sign in</Link>
//                         </span>  
//                         )}
                        
//                     </div>              
//                 </form>
//             </div>
//         )
//     }
// }

// export default ResetPass;