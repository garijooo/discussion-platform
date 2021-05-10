import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signIn } from '../../store/actions';

import axios from 'axios';
import { baseConfig } from '../../utils/requestConfigs';

import history from '../../histrory';
//styles
// import '../../styles/auth-screen.css';

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
        <div className="auth-screen">
            <form className="auth-screen__form" onSubmit={signInHandler} >
                <h3 className="auth-screen__title">Sign in</h3>
                <div className="auth-screen__form__element">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        required placeholder="Enter email" 
                        name="email"
                        id="email"   
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>  
                <div className="auth-screen__form__element">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        required placeholder="Enter password" 
                        name="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>        
                <div className="auth-screen__form__element">
                    <input 
                        type="submit" 
                        name="submit"
                        value="Sign in"
                        onSubmit={signInHandler}
                    />
                    <div className="auth-screen__form__error">
                        {error && `${error}` }
                    </div>
                </div>
                <div>
                    <span className="auth-screen__subtext">
                        Do not have an account? 
                        <Link to="/auth/signup">Sign up</Link>
                    </span>      
                    <span className="auth-screen__subtext">
                        Forgot my password
                        <Link to="/auth/forgotpass">Restore</Link>
                    </span> 
                </div>         
            </form>
        </div>
    );
}

export default SingIn;


// class SignIn extends React.Component {
//     state = { email: null, password: null, error: null };

//     componentDidMount() {
//         if(localStorage.getItem("authtoken")) history.push('/');
//     }

//     signInHandler = async (e: any) => {
//         e.preventDefault();
        
//         try {
//             const { data } = await axios.post(
//                 "/api/auth/signin",
//                 { email: this.state.email, password: this.state.password },
//                 baseConfig
//             );

//             localStorage.setItem("authtoken", data.token);
//             // this.props.signIn(data._id, data.email, data.username);
//             history.push('/');
//         } catch(error){
//             // this.props.signOut();
//             localStorage.removeItem("authtoken");
//             this.setState({ error: error.response.data.error });
//         }

//     }

//     render() {
//         return (
//             <div className="auth-screen">
//                 <form className="auth-screen__form" 
//                     onSubmit={this.signInHandler}
//                 >
//                     <h3 className="auth-screen__title">Sign in</h3>
//                     <div className="auth-screen__form__element">
//                         <label htmlFor="email">Email:</label>
//                         <input 
//                             type="email" 
//                             required placeholder="Enter email" 
//                             name="email"
//                             id="email"

//                             onChange={e => this.setState({ email: e.target.value })}
//                         />
//                     </div>  
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
//                         <input 
//                             type="submit" 
//                             name="submit"
//                             value="Sign in"
//                             onSubmit={e => this.signInHandler(e)}
//                         />
//                         <div className="auth-screen__form__error">
//                             {this.state.error && `${this.state.error}` }
//                         </div>
//                     </div>
//                     <div>
//                         <span className="auth-screen__subtext">
//                             Do not have an account? 
//                             <Link to="/auth/signup">Sign up</Link>
//                         </span>      
//                         <span className="auth-screen__subtext">
//                             Forgot my password
//                             <Link to="/auth/forgotpass">Restore</Link>
//                         </span> 
//                     </div>         
//                 </form>
//             </div>
//         )
//     }
// }

// // export default connect(null, { signIn, signOut } )(SignIn);
// export default SignIn;