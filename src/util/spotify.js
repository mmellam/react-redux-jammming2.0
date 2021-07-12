const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = 'http://localhost:3000/start/';

// Implicit grant flow authentication for Spotify API
const onClickGetAccessToken = () => {
    if (window.sessionStorage.accessToken) {
        return window.sessionStorage.accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    // get auth token from Spotify auth endpoint
    if (!accessTokenMatch || !expiresInMatch) {
        window.sessionStorage.previousUrl = window.location;
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public%20user-top-read&redirect_uri=${redirectUri}`;
        window.location = accessUrl;
    }
    // check if access token is provided in URL
    if (accessTokenMatch && expiresInMatch) {
        window.sessionStorage.accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        // clear the access token and URL parameters
        window.history.pushState('Access Token', null, '/');
        window.setTimeout(() => window.sessionStorage.accessToken = '', expiresIn);
        console.log('expires in: ' + expiresIn);
        return window.sessionStorage.accessToken;
    }
};

const savePlaylistToSpotify = async (playlistToCreate) => {
    const accessToken = window.sessionStorage.accessToken;
    const headers = { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    };

    const idResponse = await fetch(`https://api.spotify.com/v1/me`, {
        headers: headers
    });
    const idResponseJSON = await idResponse.json();
    const userId = idResponseJSON.id;

    const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ name: playlistToCreate.playlistName })
    });
    const createPlaylistResponseJSON = await createPlaylistResponse.json();
    const playlistId = createPlaylistResponseJSON.id;

    const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ uris: playlistToCreate.trackUris })
    });
    const addTracksResponseJSON = await addTracksResponse.json();
    console.log(addTracksResponseJSON);
    return addTracksResponseJSON;
}

const logout = () => {
    window.sessionStorage.accessToken = '';
    window.sessionStorage.previousUrl = '';
    window.history.pushState('Access Token', null, '/');
    window.location = 'http://localhost:3000/';
}

export { onClickGetAccessToken, savePlaylistToSpotify, logout };