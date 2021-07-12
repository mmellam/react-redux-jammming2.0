import React from 'react';

const RequireLogin = () => {
    return (
        <div className='require-login'>
            <h2>You are currently not logged in</h2>
            <p>Please click on the Connect-To-Spotify Button to connect Jammming to your Spotify account and explore new songs based on your listening history.</p>
        </div>
    );
}

export default RequireLogin;