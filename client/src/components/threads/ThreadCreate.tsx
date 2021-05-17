import React, { useState, useEffect, FC, FormEvent } from 'react';

import { useCookies } from 'react-cookie';

import { useSelector } from 'react-redux';
import { States } from '../../types/user';


// foreign components
import ThreadForm from './ThreadForm';
import ThreadFormReview from './ThreadFormReview';

import history from '../../histrory';
import Thread from './Thread';
import { ThreadFormData } from '../../types/thread';


const ThreadCreate: FC = () => {
    const [showFormReview, setShowFormReview] = useState<boolean>(false);
    const [data, setData] = useState<ThreadFormData>({ heading: '', text: '' });

    const [cookies, setCookie, removeCookie] = useCookies(['authtoken']);
    const username = useSelector((state: States): string => state.user.username);

    useEffect(() => {
        if (!cookies['authtoken']) return history.push('/auth/signin');
    }, []);

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    const onPreviewHandler = (data: ThreadFormData): void => {
        setShowFormReview(!showFormReview);
        setData(data);
    }

    const onCancelHandler = () => {
        setShowFormReview(!showFormReview);
    }

    const renderContent = function () {
        return (
            <section className="thread__create">
                <h2>Create your thread</h2>
                {
                    showFormReview ?
                        <ThreadFormReview
                            data={data}
                            onCancel={onCancelHandler}
                        />
                        :
                        <ThreadForm 
                        onSubmit={onPreviewHandler} 
                        data={data.heading !== '' && data.text !== '' ? data : undefined}
                        />
                }
            </section>
        );
    }

    return (
        <>

            <Thread username={username} renderContent={renderContent} />
        </>
    );
}

export default ThreadCreate;