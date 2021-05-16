import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';

interface Props {
    username: string
}


const ProfilePreview: FC<Props> = (props) => {

    useEffect(() => {
        // console.log(props.username)
    });

    return (
        <section className="profile__preview">
            <Link to={`/${props.username}/info`}>
                <img className="profile__preview_avatar" src="https://64.media.tumblr.com/78dee0987763c0979e3876102c736278/tumblr_pwv6trGqw91vy2tgqo2_400.jpg" alt="avatar"></img>
                <h2 className="profile__preview_username">{props.username}</h2>
            </Link>
        </section>
    );
}

export default ProfilePreview;