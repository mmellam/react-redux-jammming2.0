import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// searches the entered search term in the Spotify API
export const search = createAsyncThunk(
    'playlistCreator/search',
    async (searchTerm) => {
        const accessToken = window.sessionStorage.accessToken;
        //console.log(accessToken)
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const responseJSON = await response.json();
        return responseJSON;
    }
);
// save the playlist to the Spotify account and add selected tracks to this playlist
export const savePlaylist = createAsyncThunk(
    'playlistCreator/savePlaylist',
    async (playlistToCreate) => {

        
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
        //console.log(addTracksResponseJSON);
        return addTracksResponseJSON;
    }
);

const playlistCreatorSlice = createSlice({
    name: 'playlistCreator',
    initialState: {
        searchResults: [],
        isLoadingResults: false,
        failedToLoadResults: false,
        newPlaylist: []
    },
    reducers: {
        addTrack: (state, action) => {
            const track = state.searchResults.filter((track) => track.id === action.payload);
            if (!state.newPlaylist.find((savedTrack) => savedTrack.id === action.payload)) {
                state.newPlaylist.push(...track);
            }
        },
        removeTrack: (state, action) => {
            state.newPlaylist = state.newPlaylist.filter((track) => track.id !== action.payload);
        }
    },
    extraReducers: {
        [search.pending]: (state) => {
            state.isLoadingResults = true;
            state.failedToLoadResults = false;
        },
        [search.fulfilled]: (state, action) => {
            state.isLoadingResults = false;
            state.failedToLoadResults = false;
            const searchResults = action.payload.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }
            });
            state.searchResults = [...searchResults];
            console.log(state.searchResults);
        },
        [search.rejected]: (state,action) => {
            state.isLoadingResults = false;
            state.failedToLoadResults = true;
        },
        [savePlaylist.pending]: (state) => {

        },
        [savePlaylist.fulfilled]: (state, action) => {
            //console.log(action.payload)
            state.newPlaylist = [];
        },
        [savePlaylist.rejected]: (state, action) => {

        }
    }
    
});

export const { addTrack, removeTrack } = playlistCreatorSlice.actions;

export const selectSearchResults = (state) => state.playlistCreator.searchResults;
export const selectNewPlaylist = (state) => state.playlistCreator.newPlaylist;

export default playlistCreatorSlice.reducer;