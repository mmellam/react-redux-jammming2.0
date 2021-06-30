import React from 'react';
import { onClickGetAccessToken } from '../../util/spotify';

const Start = () => {
    const onClickRetrieveToken = () => {
        onClickGetAccessToken();
        window.location = 'http://localhost:3000/';
    }

    return (
        <div>
            <h2>Connect to your Spotify Account</h2>
            <p>You will be logged in for one hour</p>
            <button onClick={onClickRetrieveToken} type='button'>OK</button>
        </div>
    );
}

export default Start;