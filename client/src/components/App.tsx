import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';

//auth components
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import ForgotPass from './auth/ForgotPass';
import ResetPass from './auth/ResetPass';

// thread components
import ThreadShow from './threads/ThreadShow';
import ThreadCreate from './threads/ThreadCreate';
import ThreadDelete from './threads/ThreadDelete';


// basic components
import Error from './Error';
import Main from './Main';

import history from '../histrory';
// styles
import '../styles/index.scss';

import Profile from './profile/Profile';
import Threads from './threads/Threads';
import ProfileInfo from './profile/ProfileInfo';

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

                    <Route exact path="/threads/new" component={ThreadCreate} />
                    <Route exact path="/threads/delete/:id" component={ThreadDelete} />
                    <Route exact path="/threads/:id" component={ThreadShow} />
                    <Route exact path="/threads" component={Threads} />
                    



                    <Route exact path="/:username" component={Profile} />
                    <Route exact path="/:username/info" component={ProfileInfo} />

                    <Route path="/" component={Error} />
                </Switch>
            </div>
        </Router>
    );
}
export default App;