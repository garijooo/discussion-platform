import axios from 'axios';
import React from 'react';
import history from '../histrory';
import { connect } from 'react-redux';
import { signOut, signIn } from '../actions';

class Main extends React.Component {

    componentDidMount() {
        if(!localStorage.getItem("authtoken")) history.push('/auth/signin'); 
        this.fetchPrivateData();
    }
    fetchPrivateData = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("authtoken")}`
            }
        }

        try {
            const { data } = await axios.get('/api/private', config);
            this.props.signIn(data.data._id, data.data.email, data.data.username);
        } catch(e) {
            localStorage.removeItem("authtoken");
            this.props.signOut();
        }
    }

    signOutHandler = () => {
        localStorage.removeItem("authtoken");
        this.props.signOut();
        history.push('/auth/signin');
    }

    render() {
        return (
            <div>
                <p>Main page</p>
                {this.props._id && (
                    <div>
                        <p>
                            USER ID: {this.props._id}
                        </p>
                        <p>
                            EMAIL: {this.props.email}
                        </p>
                        <p>
                            USERNAME: {this.props.username}
                        </p>
                        <button onClick={this.signOutHandler}>Sign out</button>
                    </div>
                )}       
                {this.props.error && `error is: ${this.props.error}`}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        _id: state.auth._id,
        email: state.auth.email,
        username: state.auth.username,
        error: state.auth.error
    };
}

export default connect(mapStateToProps, { signOut, signIn })(Main);