import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { savePlaylistToSpotify } from '../../util/spotify';

// get user's top artists from Spotify API
export const getTopArtists = createAsyncThunk(
    'similarArtistsPlaylist/getTopArtists',
    async () => {
        const accessToken = window.sessionStorage.accessToken;
        //console.log(accessToken)
        const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=15&time_range=short_term`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const responseJSON = await response.json();
        console.log(responseJSON);
        return responseJSON;
    }
);



export const saveSimilarArtistsPlaylist = createAsyncThunk(
    'similarArtistsPlaylist/saveSimilarArtistsPlaylist',
    async (playlistToCreate) => {
        savePlaylistToSpotify(playlistToCreate);
    }
);

const similarArtistsPlaylistSlice = createSlice({
    name: 'similarArtistsPlaylist',
    initialState: {
        topArtists: [],
        selectedArtists: [], // should only hold 5 artists
        recommendedTracksArtist: [], // results from Spotify API
        topArtistsPlaylist: [],
        limitExceeded: false // whether limit of 5 is exceeded or not
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

        [saveSimilarArtistsPlaylist.pending]: (state) => {

        },
        [saveSimilarArtistsPlaylist.fulfilled]: (state, action) => {
            //console.log(action.payload)
            //state.topArtistsPlaylist = [];
        },
        [saveSimilarArtistsPlaylist.rejected]: (state, action) => {

        }
    }
});

export const { toggleArtistSelection, checkLimitExceeded } = similarArtistsPlaylistSlice.actions;

export const selectTopArtists = (state) => state.similarArtistsPlaylist.topArtists;
export const selectTopArtistsPlaylist = (state) => state.similarArtistsPlaylist.topArtistsPlaylist;
export const selectLimitExceeded = (state) => state.similarArtistsPlaylist.limitExceeded;
export const selectRecommendedTracksArtist = (state) => state.similarArtistsPlaylist.recommendedTracksArtist;

export default similarArtistsPlaylistSlice.reducer;