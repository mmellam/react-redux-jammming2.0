import React from 'react';
import { onClickGetAccessToken } from '../../util/spotify';
import logo from '../PlaylistCreator/Spotify_Icon_RGB_White.png';

const ConnectButton = () => {
    if (window.sessionStorage.accessToken) {
        return null;
    }
    return (
        <button onClick={onClickGetAccessToken} className='rounded-button connect-button' type='button'>
            <img src={logo} alt='spotify'/>
            Connect to Spotify</button>
    );
}


export default ConnectButton;