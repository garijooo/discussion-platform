import React, { FC } from 'react';

import comment from './comment.png';

const ThreadsShow: FC = () => {
    return (
        <>
            <div>
                <hr className="threads__hr"></hr>
                <hr className="threads__green_hr"></hr>
            </div>
            <div className="threads__thread">
                <div id="1">
                    <h3>Author</h3>
                    <a href="/thread/1">
                        <h2>Thread's header</h2>
                    </a>
                    <h3>20</h3>
                    <img className="threads__comment_img" src={comment}></img>
                </div>
                <div id="2">
                    <h3>Author</h3>
                    <a href="/thread/2">
                        <h2>Thread's header</h2>
                    </a>
                    <img className="threads__img" src="https://i.pinimg.com/originals/bc/75/16/bc7516d437b3381d90a9ae674562b560.jpg"></img>
                    <h3>22</h3>
                    <img className="threads__comment_img" src={comment}></img>
                </div>
            </div>
        </>
    );
}

export default ThreadsShow;