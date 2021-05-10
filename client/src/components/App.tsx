import React from 'react';
import axios from 'axios';
import { Switch, Router, Route } from 'react-router-dom';

//auth components
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import ForgotPass from './auth/ForgotPass';
import ResetPass from './auth/ResetPass';

import Main from './Main';

// sub components
import Error from './Error';

import history from '../histrory';
const App = () => {
    return (
        <Router history={history}>
            <div className="app">
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/auth/signin" component={SignIn} />
                    <Route exact path="/auth/signup" component={SignUp} />
                    <Route exact path="/auth/forgotpass" component={ForgotPass} />
                    <Route exact path="/auth/resetpass/:resetToken" component={ResetPass} />
                    <Route path="/" component={Error} />
                </Switch>
            </div>
        </Router>
    );
}
export default App;