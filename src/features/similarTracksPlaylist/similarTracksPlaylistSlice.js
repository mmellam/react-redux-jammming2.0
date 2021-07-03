import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { savePlaylistToSpotify } from '../../util/spotify';

// get user's top tracks from Spotify API
export const getTopTracks = createAsyncThunk(
    'similarTracksPlaylist/getTopTracks',
    async () => {
        const accessToken = window.sessionStorage.accessToken;
        //console.log(accessToken)
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
        limitExceededTracks: false  // whether limit of 5 is exceeded or not
    },
    reducers: {

    },
    extraReducers: {
        [getTopTracks.pending]: (state) => {

        },
        [getTopTracks.fulfilled]: (state, action) => {
            console.log('hi')
            console.log(action.payload);
            
            const topTracks = action.payload.items.map((track) => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }
            });
            
            console.log(topTracks);
            state.topTracks = [...topTracks];
        },
        [getTopTracks.rejected]: (state, action) => {

        },

        [saveSimilarTracksPlaylist.pending]: (state) => {

        },
        [saveSimilarTracksPlaylist.fulfilled]: (state, action) => {
            //console.log(action.payload)
            //state.topTracksPlaylist = [];
        },
        [saveSimilarTracksPlaylist.rejected]: (state, action) => {

        }

    }
});

export const selectTopTracks = (state) => state.similarTracksPlaylist.topTracks;
console.log(selectTopTracks)
export default similarTracksPlaylistSlice.reducer;