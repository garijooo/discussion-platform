import React, { useState, useEffect, FC } from 'react';

import { reduxForm } from 'redux-form';

import { useCookies } from 'react-cookie';

import { useSelector } from 'react-redux';
import { States } from '../../types/user';

// foreign components
import Header from '../Header';
import ThreadForm from './ThreadForm';
import ThreadFormReview from './ThreadFormReview';

import history from '../../histrory';
import Thread from './Thread';


const ThreadCreate: FC = () => {
    const [showFormReview, setShowFormReview] = useState<boolean>(false);

    const [cookies, setCookie, removeCookie] = useCookies(['authtoken']);
    const username = useSelector((state: States): string => state.user.username);

    useEffect(() => {
        if (!cookies['authtoken']) return history.push('/auth/signin');
    }, []);

    const renderContent = function () {
        return (
            <section className="thread__create">
                <h2>Create your thread</h2>
                {showFormReview ? <ThreadFormReview /> : <ThreadForm />}
            </section>
        );
    }

    return (
        <>

            <Thread username={username} renderContent={renderContent} />
        </>
    );
}

export default reduxForm({ form: 'threadForm' })(ThreadCreate);