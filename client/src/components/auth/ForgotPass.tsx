import React, { useState, FC, FormEvent } from 'react';

import axios from 'axios';
import { baseConfig } from '../../utils/requestConfigs';

import history from '../../histrory';

const ForgotPass: FC = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const forgotPassHandler = async (e: FormEvent<HTMLFormElement> | FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(!email) return setError('Enter an email');
        try {
            const { data } = await axios.post('/api/auth/forgotpass', { email }, baseConfig );
            setError('');
            console.log(123);
            setSuccess(data.data);
        } catch (error) {
           setError(error.response.data.error);
           setSuccess(''); 
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
            <form className="auth__form form" onSubmit={forgotPassHandler} >
            <h3 className="form__title">Forgot password</h3>
            <div className="form__element">
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    required placeholder="Enter email" 
                    name="email"
                    id="email"               
                    onChange={e => setEmail(e.target.value)}
                />
            </div>  
            <div className="form__element form__subtext">
                <input 
                    type="submit" 
                    name="submit"
                    value="Send an email"
                    onSubmit={forgotPassHandler}
                />
                <span className="form__subtext_span">
                    {success && `${success}`}
                </span> 
            </div> 
            <div className="form__error">
                {error && `Error: ${error}` }
            </div>
        </form>
    </div>
    );
}

export default ForgotPass;


// class ForgotPass extends React.Component {
//     render() {
//         return (
//         <div className="auth-screen">
//             <form className="auth-screen__form" 
//                 onSubmit={e => this.forgotPassHandler(e)}
//             >
//                 <h3 className="auth-screen__title">Forgot password</h3>
//                 <div className="auth-screen__form__element">
//                     <label htmlFor="email">Email:</label>
//                     <input 
//                         type="email" 
//                         required placeholder="Enter email" 
//                         name="email"
//                         id="email"

//                         onChange={e => this.setState({ email: e.target.value })}
//                     />
//                 </div>  
//                 <div className="auth-screen__form__element">
//                     <input 
//                         type="submit" 
//                         name="submit"
//                         value="Send an email"
//                         onClick={e => this.forgotPassHandler(e)}
//                     />
//                     <div className="auth-screen__form__error">
//                         {this.state.error && `Error: ${this.state.error}` }
//                         {this.state.success && `Success: ${this.state.success}` }
//                     </div>
//                 </div>             
//             </form>
//         </div>
//         )
//     }
// }

// export default ForgotPass;