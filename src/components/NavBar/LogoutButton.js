import React from 'react';
import { logout } from '../../util/spotify';
import logo from '../PlaylistCreator/Spotify_Icon_RGB_White.png';

const LogoutButton = () => {
    if (!window.sessionStorage.accessToken) {
        return null;
    }
    return (
        <button onClick={logout} className='rounded-button connect-button' type='button'>
            <img src={logo} alt='spotify'/>
            Logout</button>
    );
}


export default LogoutButton;