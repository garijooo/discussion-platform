import React, { FC } from 'react';
import axios from 'axios';

import { useSelector } from 'react-redux';

import { ThreadFormData } from '../../types/thread';
import { baseConfig } from '../../utils/requestConfigs';
import { States } from '../../types/user';

import history from '../../histrory';

interface Props {
    onCancel(): void,
    data: ThreadFormData
}

const ThreadFormReview: FC<Props> = props => {
    const id = useSelector((state: States) => state.user.id); 

    const onFormSubmitHandler = async () => {
        // console.log(`${props.data.heading} ${props.data.text}`)
        const { heading, description} = props.data;
        const authorId = id;
        try {
            const { data } = await axios.post('/api/thread/new', { authorId, heading, description}, baseConfig);
            if(data.success) return history.push(`/threads/${data.id}`);
        } catch (error) {
            console.log(error.response.data.error);
        }
    }

    return(
        <>
            <span>Heading: {props.data.heading}</span>
            <span>Text: {props.data.description}</span>
            <span>Are you sure?</span>
            <div>
                <button onClick={props.onCancel}>Back</button>
                <button onClick={onFormSubmitHandler}>Create</button>
            </div>
        </>
    );
}

export default ThreadFormReview;