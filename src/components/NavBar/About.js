import React from 'react';

const About = () => {
    return (
        <div className='about'>
            <h2>About Jammming</h2>
            <p>Jammming is a Playlist Creator application that uses the Spotify Web API to connect to your Spotify account.</p>
            <p>It allows you to easily generate playlists of your favorite music and explore new songs based on your listening history and preferred song characteristics such as energy, danceability, or acousticness.</p>
            <p>This app requires a Spotify account. Upon connecting, the app needs authorization to read your top artists and tracks and to create a playlist to your account. The app works as client side only and your Spotify data is not stored on any server.</p>
            <p>To log in with a different Spotify account, go to accounts.spotify.com and click the Logout button. Then revisit Jammming and sign in with different account.</p>
        </div>
    );
}

export default About;