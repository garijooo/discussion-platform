import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'; 
import { signIn } from '../store/actions';
import { States } from '../types/user';

const Header = () => {
    const username = useSelector((state: States) => state.user.username);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(localStorage.getItem("authtoken") && !username) dispatch(signIn(localStorage.getItem("authtoken")));
    }, []);

    const renderAuthLinksList = function() {
        return(
            <>
            auth
            </>
        );
    }

    const renderNonAuthLinksList = function() {
        return(
            <>
                non-auth
            </>
        );
    }

    return(
        <header className="header">
            <nav className="header__nav">
                <div className="header__nav_headings">
                    Headings
                </div>
                {username ? renderAuthLinksList() : renderNonAuthLinksList()}
            </nav>
        </header>
    );
}

export default Header;