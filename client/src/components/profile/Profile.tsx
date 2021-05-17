import React, { useEffect, useState, FC } from 'react';

import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';



import Header from '../Header';
import ThreadsShow from '../threads/ThreadsShow';
import ArticlesShow from '../articles/ArticlesShow';
import ProfilePreview from './ProfilePreview';

import { useCookies } from 'react-cookie';

interface MatchParams {
    username: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

const Profile: FC<Props> = props => {
    const [selected, setSelected] = useState<boolean>(true);

    const [cookies, setCookie, removeCookie] = useCookies(['authtoken']);

    useEffect(() => {
        // console.log(cookies['authtoken']);
    }, []);

    return (
        <div>
            <Header />
            <div className="profile">
                <ProfilePreview username={props.match.params.username}/>
                <div className="profile__creation">
                    <div className="profile__creation_item">
                        <h2>Create new article</h2>
                        <Link to="/article/new" className="item__add">+</Link>
                    </div>
                    <div className="profile__creation_item">
                        <h2>Create new thread</h2>
                        <Link to="/threads/new" className="item__add">+</Link>
                    </div>
                </div>
            </div>
            <div className="profile__section">
                <div className="profile__section_select">
                    <h2 onClick={() => setSelected(true)}>Articles</h2>
                    <h2 onClick={() => setSelected(false)}>Threads</h2>
                </div>
                <div className="profile__section_display">
                    {selected ? <ArticlesShow /> : <ThreadsShow />}
                </div>
            </div>
        </div>
    );
}

export default Profile;