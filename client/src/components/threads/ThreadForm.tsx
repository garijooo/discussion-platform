import React, { FC, useEffect, FormEvent } from 'react';

import { useForm } from "react-hook-form";
import { ThreadFormData } from '../../types/thread';


interface Props {
    onSubmit(data: ThreadFormData): void,
    data?: ThreadFormData
}

const ThreadForm: FC<Props> = props => {
    
    const { register, handleSubmit, watch, formState: { errors }} = useForm<ThreadFormData, FormEvent<HTMLFormElement>>();

    useEffect(() => {
        // console.log(watch('title'));
    }, [watch('heading')]);



    // const initSubmit = function(data: ThreadFormData, e: FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //     handleSubmit((data: ThreadFormData) => props.onSubmit(data));
    // }
    return (
        <>
            <form 
                className="thread__create_form form"
                onSubmit={handleSubmit((data: ThreadFormData) => props.onSubmit(data))}
            >
                <label htmlFor="heading">Heading</label>
                                <textarea 
                    id="heading"
                    {...register('heading')} 
                    defaultValue={props.data?.heading && props.data.heading}
                    cols={3}
                    rows={3} 
                    maxLength={100}
                    placeholder="maximum size is 100 symbols"
                    required
                />
                <label htmlFor="text">Text</label>
                <textarea 
                    id="text"
                    {...register('text')} 
                    defaultValue={props.data?.text && props.data.text}
                    cols={3}
                    rows={5} 
                    maxLength={200}
                    placeholder="maximum size is 200 symbols"
                    required
                />
                <input type="submit" value="Next"/> 
            </form>
        </>
    );
}

export default ThreadForm;