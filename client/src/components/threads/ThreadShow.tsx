import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

import axios from 'axios';
import { baseConfig } from '../../utils/requestConfigs';
import Thread from './Thread';
import Error from '../Error';
import { ThreadData } from '../../types/thread';

interface MatchParams {
    id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

const ThreadShow: FC<Props> = props => {
    const emptyThread = { heading: '', authorId: '', description: '' };

    const [thread, setThread] = useState<ThreadData>(emptyThread);
    const [authorUsername, setAuthorUsername] = useState<string>('');

    useEffect(() => {
        const getThread = async () => {
            if (!props.match.params.id) return setThread(emptyThread);
            const { id } = props.match.params;
            try {
                const { data } = await axios.get(`/api/thread/get/${id}`, baseConfig);
                setThread(data.thread);
            } catch (error) {
                console.log(error.response.data.error);
            }
        }

        getThread();
    }, []);

    useEffect(() => {
        const getUser = async () => {
            if (!thread) return;
            try {
                const { data } = await axios.get(`/api/user/get/${thread.authorId}`, baseConfig)
                setAuthorUsername(data.username);
            } catch (err) {
                console.log(err.response.data.error);
            }
        }

        getUser();
    }, [thread]);

    const renderContent = function () {
        if (thread !== emptyThread && authorUsername) 
            return (
                <section className='thread__show'>
                    <h1>{thread.heading}</h1>
                    <span>{thread.description}</span>
                    <span>{authorUsername}</span>;
                </section>
            );
        return <></>;
    }

    return (
        <div>
            {
                thread && authorUsername
                    ?
                    <Thread username={authorUsername} renderContent={renderContent} />
                    :
                    <Error />
            }
        </div>
    );
}

export default ThreadShow;