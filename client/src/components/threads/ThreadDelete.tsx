import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

import { useSelector } from 'react-redux';

import axios from 'axios';
import { baseConfig } from '../../utils/requestConfigs';

import history from '../../histrory';
import { States } from '../../types/user';
import Error from '../Error';

interface MatchParams {
    id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

const ThreadDelete: FC<Props> = props => {
    const username = useSelector((state: States) => state.user.username)
    
    useEffect(() => {
        const { id } = props.match.params;

        // const getThread = async () => {
        //     try {
        //         const { data } = await axios.get(`/api/thread/get/${id}`, baseConfig); 
        //         console.log(data);
        //         if(data.success) return history.push('/'); 
        //     } catch (error) {
        //         console.log(error.response.data.error);
        //     } 
        // }

        const deleteThread = async () => {

            try {
                const { data } = await axios.delete(`/api/thread/delete/${id}`, baseConfig); 
                console.log(data);
                if(data.success) return history.push('/'); 
            } catch (error) {
                console.log(error.response.data.error);
            }
        }

        if(props.match.params.id) deleteThread(); 
    }, []);
    return (
        <>
            <Error />
        </>
    );
}

export default ThreadDelete;