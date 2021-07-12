import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkTokenExpiry, savePlaylistToSpotify } from '../../util/spotify';

// get user's top tracks from Spotify API
export const getTopTracks = createAsyncThunk(
    'similarTracksPlaylist/getTopTracks',
    async () => {
        const accessToken = window.sessionStorage.accessToken;
        if (!accessToken) {
            window.sessionStorage.previousUrl = window.location;
            return;
        }
        if (!checkTokenExpiry()) {
            return;
        } 
        const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=short_term`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const responseJSON = await response.json();
        console.log(responseJSON);
        return responseJSON;
    }
);

// get recommendations based on user's selected tracks
export const getTrackBasedRecommendations = createAsyncThunk(
    'similarTracksPlaylist/getTrackBasedRecommendations',
    async (queryString) => {
        const accessToken = window.sessionStorage.accessToken;
        if (!checkTokenExpiry()) {
            return;
        } 
        const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=30&seed_tracks=${queryString}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        const responseJSON = await response.json();
        console.log(responseJSON);
        return responseJSON;
    }
);

// save playlist to user's Spotify account
export const saveSimilarTracksPlaylist = createAsyncThunk(
    'similarTracksPlaylist/saveSimilarTracksPlaylist',
    async (playlistToCreate) => {
        savePlaylistToSpotify(playlistToCreate);
    }
);

const similarTracksPlaylistSlice = createSlice({
    name: 'similarTracksPlaylist',
    initialState: {
        topTracks: [],              // holds user's top tracks fetched from Spotify API
        selectedTracks: [],         // should only hold 5 tracks due to API limit
        recommendedTracks: [],      // recommended results from Spotify API
        topTracksPlaylist: [],      // holds tracks for playlist selected by user
        limitExceededTracks: false, // whether limit of 5 is exceeded or not
        browseOptions: [            // default values for user selected filters 
            {name: 'target_energy', value: '0.5'},
            {name: 'target_danceability', value: '0.5'},
            {name: 'target_speechiness', value: '0.5'},
            {name: 'target_acousticness', value: '0.5'},
            {name: 'target_instrumentalness', value: '0.5'}
        ],
        trackPlaylistSaved: false                   
    },
    reducers: {
        toggleTrackSelection: (state, action) => {
            const track = state.topTracks.filter((artist) => artist.id === action.payload);
            if (!state.selectedTracks.find((artist) => artist.id === action.payload)) {
                state.selectedTracks.push(...track);
            } else {
                state.selectedTracks = state.selectedTracks.filter((artist) => artist.id !== action.payload);
            }
        },
        checkLimitExceededTracks: (state) => {
            if (!state.selectedTracks[5]) {
                state.limitExceededTracks = false;
            } else {
                state.limitExceededTracks = true;
            }
        },
        addTrackTrackPlaylist: (state, action) => {
            const track = state.recommendedTracks.filter((track) => track.id === action.payload);
            if (!state.topTracksPlaylist.find((savedTrack) => savedTrack.id === action.payload)) {
                state.topTracksPlaylist.push(...track);
            } else {
                window.alert('This song is already in your playlist. Jammming currently filters out duplicate songs.');
            }
        },
        removeTrackTrackPlaylist: (state, action) => {
            state.topTracksPlaylist = state.topTracksPlaylist.filter((track) => track.id !== action.payload);
        },
        clearSelectedTracks: (state) => {
            state.selectedTracks = [];
        },
        addOption: (state, action) => {
            if (!state.browseOptions.find((option) => option.name === action.payload.name)) {
                state.browseOptions.push(action.payload);
            } else {
                state.browseOptions.forEach((option) => {
                    if (option.name === action.payload.name) {
                        option.value = action.payload.value;
                    }
                });
            }
        }
    },
    extraReducers: {
        [getTopTracks.pending]: (state) => {

        },
        [getTopTracks.fulfilled]: (state, action) => {
            const topTracks = action.payload.items.map((track) => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                    image: track.album.images[2].url
                }
            });
            state.topTracks = [...topTracks];
        },
        [getTopTracks.rejected]: (state, action) => {

        },
        [getTrackBasedRecommendations.pending]: (state) => {

        },
        [getTrackBasedRecommendations.fulfilled]: (state, action) => {
            //console.log(action.payload)
            const recommendedTracks = action.payload.tracks.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                    image: track.album.images[2].url
                }
            });
            state.recommendedTracks = [...recommendedTracks];
            console.log(state.recommendedTracks);

        },
        [getTrackBasedRecommendations.rejected]: (state, action) => {

        },

        [saveSimilarTracksPlaylist.pending]: (state) => {
            state.trackPlaylistSaved = false;
        },
        [saveSimilarTracksPlaylist.fulfilled]: (state, action) => {
            //console.log(action.payload)
            state.trackPlaylistSaved = true;
            state.topTracksPlaylist = [];
        },
        [saveSimilarTracksPlaylist.rejected]: (state, action) => {
            state.trackPlaylistSaved = false;
        }
    }
});

export const { 
    toggleTrackSelection, 
    checkLimitExceededTracks, 
    addTrackTrackPlaylist, 
    removeTrackTrackPlaylist, 
    clearSelectedTracks,
    addOption } = similarTracksPlaylistSlice.actions;

export const selectTopTracks = (state) => state.similarTracksPlaylist.topTracks;
export const selectRecommendedTracks = (state) => state.similarTracksPlaylist.recommendedTracks;
export const selectTopTracksPlaylist = (state) => state.similarTracksPlaylist.topTracksPlaylist;
export const selectLimitExceededTracks = (state) => state.similarTracksPlaylist.limitExceededTracks;
export const selectSelectedTracks = (state) => state.similarTracksPlaylist.selectedTracks;
export const selectBrowseOptions = (state) => state.similarTracksPlaylist.browseOptions;
export const selectTrackPlaylistSaved = (state) => state.similarTracksPlaylist.trackPlaylistSaved;

export default similarTracksPlaylistSlice.reducer;