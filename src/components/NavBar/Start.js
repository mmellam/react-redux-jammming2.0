import React from 'react';
import { logout, onClickGetAccessToken } from '../../util/spotify';

const Start = () => {
    const onClickRetrieveToken = () => {
        onClickGetAccessToken();
        window.location = window.sessionStorage.previousUrl;
    }

    return (
        <div className='start'>
            <h2>Connect to Your Spotify Account</h2>
            <p>Click OK to connect this app to your Spotify account.</p>
            <p>You will be automatically logged out after 60 minutes.</p>
            <p>When your session expires, simply click the Connect button again to reconnect.</p>
            <button 
                onClick={onClickRetrieveToken} 
                type='button'
                className='rounded-button select-button'>OK</button>
            <button 
                onClick={logout} 
                type='button'
                className='rounded-button select-button'>Cancel</button>
        </div>
    );
}

export default Start;