import React, { FC, useEffect } from 'react';

import { useCookies } from 'react-cookie';

import { useSelector } from 'react-redux';

// foreign components
import Header from '../Header';
import ProfilePreview from '../profile/ProfilePreview';

import history from '../../histrory';

interface Props {
    username: string,
    renderContent(): JSX.Element
}

const Thread: FC<Props> = (props) => {

    return (
        <>
            <Header />
            <article className="thread">
                <ProfilePreview username={props.username} />
                {props.renderContent()}
            </article>
        </>
    );
}

export default Thread;