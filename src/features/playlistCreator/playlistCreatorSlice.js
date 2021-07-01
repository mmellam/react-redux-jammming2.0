import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// searches the entered search term in the Spotify API
export const search = createAsyncThunk(
    'playlistCreator/search',
    async (searchTerm) => {
        const accessToken = window.sessionStorage.accessToken;
        console.log(accessToken)
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const responseJSON = await response.json();
        return responseJSON;
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
        }
    }
    
});

export const { addTrack, removeTrack } = playlistCreatorSlice.actions;

export const selectSearchResults = (state) => state.playlistCreator.searchResults;
export const selectNewPlaylist = (state) => state.playlistCreator.newPlaylist;

export default playlistCreatorSlice.reducer;