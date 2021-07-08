import React from 'react';
import { onClickGetAccessToken } from '../../util/spotify';
import logo from '../PlaylistCreator/Spotify_Icon_RGB_White.png';

const ConnectButton = () => {
    return (
        <button onClick={onClickGetAccessToken} className='connect-button' type='button'>
            <img src={logo} alt='spotify'/>
            Connect to Spotify</button>
    );
}


export default ConnectButton;