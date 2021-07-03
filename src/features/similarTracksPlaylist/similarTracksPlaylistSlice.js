import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { savePlaylistToSpotify } from '../../util/spotify';

// get user's top tracks from Spotify API
export const getTopTracks = createAsyncThunk(
    'similarTracksPlaylist/getTopTracks',
    async () => {
        const accessToken = window.sessionStorage.accessToken;
        const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=short_term`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
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
        const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=30&seed_tracks=${queryString}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,

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
        limitExceededTracks: false,  // whether limit of 5 is exceeded or not
        //showBrowseOptions: false,
        browseOptions: []
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
            }
        },
        removeTrackTrackPlaylist: (state, action) => {
            state.topTracksPlaylist = state.topTracksPlaylist.filter((track) => track.id !== action.payload);
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
                    uri: track.uri
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
                    uri: track.uri
                }
            });
            state.recommendedTracks = [...recommendedTracks];
            console.log(state.recommendedTracks);

        },
        [getTrackBasedRecommendations.rejected]: (state, action) => {

        },

        [saveSimilarTracksPlaylist.pending]: (state) => {

        },
        [saveSimilarTracksPlaylist.fulfilled]: (state, action) => {
            //console.log(action.payload)
            state.topTracksPlaylist = [];
        },
        [saveSimilarTracksPlaylist.rejected]: (state, action) => {

        }
    }
});

export const { toggleTrackSelection, checkLimitExceededTracks, addTrackTrackPlaylist, removeTrackTrackPlaylist } = similarTracksPlaylistSlice.actions;

export const selectTopTracks = (state) => state.similarTracksPlaylist.topTracks;
export const selectRecommendedTracks = (state) => state.similarTracksPlaylist.recommendedTracks;
export const selectTopTracksPlaylist = (state) => state.similarTracksPlaylist.topTracksPlaylist;
export const selectLimitExceededTracks = (state) => state.similarTracksPlaylist.limitExceededTracks;
export const selectSelectedTracks = (state) => state.similarTracksPlaylist.selectedTracks;//
//export const selectShowBrowseOptions = (state) => state.similarTracksPlaylist.showBrowseOptions;

export default similarTracksPlaylistSlice.reducer;