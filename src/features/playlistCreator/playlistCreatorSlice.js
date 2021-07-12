import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { onClickGetAccessToken, savePlaylistToSpotify } from '../../util/spotify';

// searches the entered search term in the Spotify API
export const search = createAsyncThunk(
    'playlistCreator/search',
    async (searchTerm) => {
        const accessToken = window.sessionStorage.accessToken;
        if (!accessToken) {
            window.sessionStorage.previousUrl = window.location;
            window.location = 'http://localhost:3000/start/';
            onClickGetAccessToken(); 
        }
        //console.log(accessToken)
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const responseJSON = await response.json();
        return responseJSON;
    }
);
// save the playlist to the Spotify account and add selected tracks to this playlist
export const saveCreatedPlaylist = createAsyncThunk(
    'playlistCreator/saveCreatedPlaylist',
    async (playlistToCreate) => {
        savePlaylistToSpotify(playlistToCreate);
    }
);

const playlistCreatorSlice = createSlice({
    name: 'playlistCreator',
    initialState: {
        searchResults: [],
        isLoadingResults: false,
        failedToLoadResults: false,
        newPlaylist: [],
        playlistSaved: false
    },
    reducers: {
        addTrack: (state, action) => {
            const track = state.searchResults.filter((track) => track.id === action.payload);
            if (!state.newPlaylist.find((savedTrack) => savedTrack.id === action.payload)) {
                state.newPlaylist.push(...track);
            } else {
                window.alert('This song is already in your playlist. Jammming currently filters out duplicate songs.');
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
                    uri: track.uri,
                    image: track.album.images[2].url
                }
            });
            state.searchResults = [...searchResults];
            //console.log(action.payload.tracks);
        },
        [search.rejected]: (state,action) => {
            state.isLoadingResults = false;
            state.failedToLoadResults = true;
        },
        [saveCreatedPlaylist.pending]: (state) => {
            state.playlistSaved = false;
        },
        [saveCreatedPlaylist.fulfilled]: (state, action) => {
            //console.log(action.payload)
            state.playlistSaved = true;
            state.newPlaylist = [];
        },
        [saveCreatedPlaylist.rejected]: (state, action) => {
            state.playlistSaved = false;
        }
    }
    
});

export const { addTrack, removeTrack } = playlistCreatorSlice.actions;

export const selectSearchResults = (state) => state.playlistCreator.searchResults;
export const selectNewPlaylist = (state) => state.playlistCreator.newPlaylist;
export const selectPlaylistSaved = (state) => state.playlistCreator.playlistSaved;

export default playlistCreatorSlice.reducer;