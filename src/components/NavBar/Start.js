import React from 'react';
import { logout, onClickGetAccessToken } from '../../util/spotify';

const Start = () => {
    const onClickRetrieveToken = () => {
        onClickGetAccessToken();
        window.history.go(-2);
    }

    return (
        <div>
            <h2>Connect to Your Spotify Account</h2>
            <p>To connect this app to your Spotify account, click OK.</p>
            <p>You will be automatically logged out after 60 minutes.</p>
            <p>To continue using the app after the login expired, simply click the Connect-to-Spotify button again.</p>
            <button onClick={onClickRetrieveToken} type='button'>OK</button>
            <button onClick={logout} type='button'>Cancel</button>
        </div>
    );
}

export default Start;