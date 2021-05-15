import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {

    return(
        <div>
            Profile
            <Link to={'/thread/new'}>New thread</Link>
        </div>
    );
}

export default Profile;