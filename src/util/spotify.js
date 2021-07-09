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
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public%20user-top-read&redirect_uri=${redirectUri}`;
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

const savePlaylistToSpotify = async (playlistToCreate) => {
    const accessToken = window.sessionStorage.accessToken;
    const headers = { Authorization: `Bearer ${accessToken}` };

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
        headers: { 
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ uris: playlistToCreate.trackUris })
    });
    const addTracksResponseJSON = await addTracksResponse.json();
    console.log(addTracksResponseJSON);
    return addTracksResponseJSON;
}

const logout = () => {
    window.sessionStorage.accessToken = '';
    window.location = 'http://localhost:3000/';
}

export { onClickGetAccessToken, savePlaylistToSpotify, logout };