import React, { useEffect, FC } from 'react';
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'; 
import { signIn, signOut } from '../store/actions';
import { States } from '../types/user';

import { useCookies } from 'react-cookie';

import history from '../histrory';

const Header:FC = () => {
    const username = useSelector((state: States) => state.user.username);

    const [cookies, setCookie, removeCookie] = useCookies(['authtoken']);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(localStorage.getItem("authtoken") && !username) dispatch(signIn(localStorage.getItem("authtoken")));
    }, []);

    const signOutHandler = () => {
        dispatch(signOut);
        removeCookie('authtoken');
        history.push('/auth/signin'); 
    }
    
    const renderAuthLinksList = function() {
        return(
            <>
                <li className="header__links_item">
                    {renderLogo()}
                </li>
                <li className="header__links_item">
                    <Link to="/" >Articles</Link>
                </li>
                <li className="header__links_item">
                    <Link to="/threads" >Threads</Link>
                </li>
                <li className="header__links_item">
                    <Link to={`/${username}`} >{username.toUpperCase()}</Link>
                </li>
                <li className="header__links_item search">
                    <input type="search" placeholder="Search"/>
                </li>
                <li className="header__links_item">
                    <Link to="" onClick={signOutHandler} >Sign Out</Link>
                </li>
            </>
        );
    }

    const renderNonAuthLinksList = function() {
        return(
            <>
                <li className="header__links_item">
                    {renderLogo()}
                </li>
                <li className="header__links_item">
                    <Link to="/" >Articles</Link>
                </li>
                <li className="header__links_item">
                    <Link to="/threads" >Threads</Link>
                </li>
                <li className="header__links_item search">
                    <input type="search" placeholder="Search"/>
                </li>
                <li className="header__links_item">
                    <Link to="/auth/signin" >Sign In</Link>
                </li>
            </>
        );
    }

    const renderLogo = function() {
        return(
            <Link to="/" className="header__headings">
                <div className="header__headings-block">    
                    <h1 className="header__headings-block_first">dis</h1>
                    <h1 className="header__headings-block_second">Culture</h1>
                </div>  
            </Link>
        );
    }
    return(
        <header className="header">
            <nav className="header__nav">
                <ul className="header__links">
                    {username ? renderAuthLinksList() : renderNonAuthLinksList()}
                </ul>
            </nav>
        </header>
    );
}

export default Header;