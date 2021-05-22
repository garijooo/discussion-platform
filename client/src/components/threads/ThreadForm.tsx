import React, { FC, useEffect, useState, FormEvent, MouseEventHandler, MouseEvent } from 'react';

import { useForm } from "react-hook-form";
import { ThreadFormData } from '../../types/thread';


interface Props {
    onSubmit(data: ThreadFormData): void,
    data?: ThreadFormData
}
interface FileReaderEventTarget extends EventTarget {
    result: string
}

interface FileReaderEvent extends ProgressEvent {
    target: FileReaderEventTarget
}


const ThreadForm: FC<Props> = props => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<ThreadFormData, FormEvent<HTMLFormElement>>();

    // states
    const [file, setFile] = useState<string | ArrayBuffer | null>();
    const [fileToUpload, setFileToUpload] = useState<File>();
    const [type, setType] = useState<string>('image');
    const [heading, setHeading] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        // console.log(watch('title'));
    }, [watch('heading')]);

    const triggerHandler = (e: MouseEventHandler<HTMLInputElement> | MouseEvent) => {
        const trigger: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
        trigger.click();
    }

    const fileChangeHandler = async (files: FileList | null) => {
        if (files![0] !== null) {
            const file = files![0];
            const fileName = `${Date.now()}-${file.name}`;
            const reader = new FileReader();
            reader.onload = (ev: ProgressEvent<FileReader>) => {
                setFile(ev.target!.result);
                setFileToUpload(file);

                // this.setState({ currentFile: ev.target.result, fileToUpload: file, fileName, visibility: 'none' });
            };
            await reader.readAsDataURL(file);
        }
    }

    const renderFileInput = function (accept: string[] = []) {
        if (accept) {
            const formats = accept.join(',');

            return (
                <>
                    <input accept={formats} name="asset" type="file" className="form__input-file"
                        onChange={e => fileChangeHandler(e.target.files)} />
                    <div className="btn">
                        <input type="submit" className="form__btn btn_submit"
                            onClick={triggerHandler} value="CHOOSE" />
                    </div>
                </>
            );
        }
        return;
    }

    const renderPreview = function () {
        if (!file) return <></>;
        else {
            return (
                <>

                </>
            );
        }
    }

    const getFormats = () => {
        switch (type) {
            case 'image':
                return ['.jpg', '.jpeg', '.png'];
            case 'animation':
                return ['.gif'];
            case 'video':
                return ['.mp4', '.avi'];
            default:
                return [];
        }
    }

    const renderInputButton = function (formats: string[] = []) {
        if (formats !== []) {
            const accept = formats.join(',');
            return (
                <>
                    <input accept={accept} name="asset" type="file" className="form__input-file"
                        onChange={e => fileChangeHandler(e.target.files)}
                    />
                    <button onClick={triggerHandler}>Choose</button>
                </>
            );
        }
        else return <></>;
    }

    const renderInputBlock = function () {
        return (
            <div className="form__input-block">
                {renderInputButton(getFormats())}
                <div className="select">
                <select value={type}
                    onChange={e => setType(e.target.value)} className="form__list"
                >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="animation">Animation</option>
                </select>
                </div>
            </div>
        );
    }

    return (
        <>
            <form
                className="thread__create_form form"
                onSubmit={handleSubmit((data: ThreadFormData) => props.onSubmit(data))}
            >
                <label htmlFor="heading" className="form__heading_label">Heading</label>
                <textarea
                    className="form__heading_textarea"
                    id="heading"
                    {...register('heading')}
                    defaultValue={props.data?.heading && props.data.heading}
                    cols={3}
                    rows={3}
                    maxLength={100}
                    placeholder="maximum size is 100 symbols"
                    required
                />
                <label htmlFor="description" className="form__description_label">Description</label>
                <textarea
                    className="form__description_textarea"
                    id="description"
                    {...register('description')}
                    defaultValue={props.data?.description && props.data.description}
                    cols={3}
                    rows={5}
                    maxLength={200}
                    placeholder="maximum size is 200 symbols"
                    required
                />
                <div className="form__action">
                    {renderInputBlock()}
                    <input type="submit" value="Next" />
                </div>
            </form>
        </>
    );
}

export default ThreadForm;