const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = 'https://project-jammming-2-0-0.netlify.app/start/';
//const redirectUri = 'http://localhost:3000/start/';

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
        const expiresInSeconds = Number(expiresInMatch[1]);
        window.sessionStorage.setItem('tokenExpiry', Date.now() + (expiresInSeconds * 1000));
        //window.sessionStorage.setItem('tokenExpiry', Date.now() + (30 * 1000));
        window.sessionStorage.setItem('accessToken', accessTokenMatch[1]);
        // clear the access token and URL parameters
        window.history.pushState('Access Token', null, '/');
        return window.sessionStorage.accessToken;
    }
};

// Check if token is still valid (valid for 60 minutes according to API)
const checkTokenExpiry = () => {
    if (Date.now() >= Number(window.sessionStorage.tokenExpiry)) {
        window.sessionStorage.removeItem('accessToken');
        window.sessionStorage.removeItem('tokenExpiry');
        window.alert('Your session has expired. Please reconnect to Spotify using the Connect Button.');
        window.location = window.sessionStorage.previousUrl;
        return false;
    } else {
        return true;
    }
};

const getUserId = async () => {
    if (window.sessionStorage.userId) {
        return window.sessionStorage.userId;  
    } else {
        const accessToken = window.sessionStorage.accessToken;
        if (!checkTokenExpiry()) {
            return;
        } 
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
        window.sessionStorage.userId = userId;
        return userId;
    }
};

const savePlaylistToSpotify = async (playlistToCreate) => {
    const accessToken = window.sessionStorage.accessToken;
    if (!checkTokenExpiry()) {
        return;
    } 
    const headers = { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    };
    const userId = await getUserId();

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
    //console.log(addTracksResponseJSON);
    return addTracksResponseJSON;
};

const logout = () => {
    window.sessionStorage.clear();
    window.history.pushState('Access Token', null, '/');
    window.location = 'https://project-jammming-2-0-0.netlify.app/';
};

export { onClickGetAccessToken, checkTokenExpiry, savePlaylistToSpotify, logout };