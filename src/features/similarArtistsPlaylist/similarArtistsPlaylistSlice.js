import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { onClickGetAccessToken, savePlaylistToSpotify } from '../../util/spotify';

// get user's top artists from Spotify API
export const getTopArtists = createAsyncThunk(
    'similarArtistsPlaylist/getTopArtists',
    async () => {
        const accessToken = window.sessionStorage.accessToken;
        if (!accessToken) {
            window.sessionStorage.previousUrl = window.location;
            return;
        }
        //console.log(accessToken)
        const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=15&time_range=short_term`, {
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

// get recommendations based on user's selected artists
export const getArtistBasedRecommendations = createAsyncThunk(
    'similarArtistsPlaylist/getArtistBasedRecommendations',
    async (queryString) => {
        const accessToken = window.sessionStorage.accessToken;
        const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=30&seed_artists=${queryString}`, {
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
export const saveSimilarArtistsPlaylist = createAsyncThunk(
    'similarArtistsPlaylist/saveSimilarArtistsPlaylist',
    async (playlistToCreate) => {
        savePlaylistToSpotify(playlistToCreate);
    }
);

const similarArtistsPlaylistSlice = createSlice({
    name: 'similarArtistsPlaylist',
    initialState: {
        topArtists: [],                 // holds user's top artists fetched from Spotify API
        selectedArtists: [],            // should only hold 5 artists due to API limit
        recommendedTracksArtist: [],    // recommended results from Spotify API
        topArtistsPlaylist: [],         // holds tracks for playlist selected by user
        limitExceeded: false            // whether limit of 5 is exceeded or not
    },
    reducers: {
        toggleArtistSelection: (state, action) => {
            const artist = state.topArtists.filter((artist) => artist.id === action.payload);
            if (!state.selectedArtists.find((artist) => artist.id === action.payload)) {
                state.selectedArtists.push(...artist);
            } else {
                state.selectedArtists = state.selectedArtists.filter((artist) => artist.id !== action.payload);
            }
        },
        checkLimitExceeded: (state) => {
            if (!state.selectedArtists[5]) {
                state.limitExceeded = false;
            } else {
                state.limitExceeded = true;
            }
        },
        addTrackArtistPlaylist: (state, action) => {
            const track = state.recommendedTracksArtist.filter((track) => track.id === action.payload);
            if (!state.topArtistsPlaylist.find((savedTrack) => savedTrack.id === action.payload)) {
                state.topArtistsPlaylist.push(...track);
            }
        },
        removeTrackArtistPlaylist: (state, action) => {
            state.topArtistsPlaylist = state.topArtistsPlaylist.filter((track) => track.id !== action.payload);
        }
    },
    extraReducers: {
        [getTopArtists.pending]: (state) => {

        },
        [getTopArtists.fulfilled]: (state, action) => {
            console.log(action.payload);
            const topArtists = action.payload.items.map((artist) => {
                return {
                    id: artist.id,
                    name: artist.name,
                    genre: artist.genres[0],
                    image: artist.images[2],
                    uri: artist.uri
                }
            });
            console.log(topArtists);
            state.topArtists = [...topArtists];
        },
        [getTopArtists.rejected]: (state, action) => {

        },
        [getArtistBasedRecommendations.pending]: (state) => {

        },
        [getArtistBasedRecommendations.fulfilled]: (state, action) => {
            //console.log(action.payload)
            const recommendedTracksArtist = action.payload.tracks.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                    image: track.album.images[2].url
                }
            });
            state.recommendedTracksArtist = [...recommendedTracksArtist];
            console.log(state.recommendedTracksArtist);

        },
        [getArtistBasedRecommendations.rejected]: (state, action) => {

        },

        [saveSimilarArtistsPlaylist.pending]: (state) => {

        },
        [saveSimilarArtistsPlaylist.fulfilled]: (state, action) => {
            //console.log(action.payload)
            state.topArtistsPlaylist = [];
        },
        [saveSimilarArtistsPlaylist.rejected]: (state, action) => {

        }
    }
});

export const { 
    toggleArtistSelection,
    checkLimitExceeded,
    addTrackArtistPlaylist,
    removeTrackArtistPlaylist 
    } = similarArtistsPlaylistSlice.actions;

export const selectTopArtists = (state) => state.similarArtistsPlaylist.topArtists;
export const selectTopArtistsPlaylist = (state) => state.similarArtistsPlaylist.topArtistsPlaylist;
export const selectSelectedArtists = (state) => state.similarArtistsPlaylist.selectedArtists;
export const selectLimitExceeded = (state) => state.similarArtistsPlaylist.limitExceeded;
export const selectRecommendedTracksArtist = (state) => state.similarArtistsPlaylist.recommendedTracksArtist;

export default similarArtistsPlaylistSlice.reducer;