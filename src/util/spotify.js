const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = 'http://localhost:3000/start/';
let accessToken;

// Implicit grant flow authentication for Spotify API
const onClickGetAccessToken = () => {
    if (accessToken) {
        return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    // get auth token from Spotify auth endpoint
    if (!accessTokenMatch || !expiresInMatch) {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        window.location = accessUrl;
    }
    // check if access token is provided in URL
    if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.sessionStorage.accessToken = accessToken;
        // clear the access token and URL parameters
        window.setTimeout(() => accessToken = '', expiresIn);
        window.history.pushState('Access Token', null, '/');
        window.setTimeout(() => window.sessionStorage.accessToken = '', expiresIn);
        return accessToken;
    }
};

const savePlaylistToSpotify = () => {

}

export { onClickGetAccessToken, savePlaylistToSpotify };