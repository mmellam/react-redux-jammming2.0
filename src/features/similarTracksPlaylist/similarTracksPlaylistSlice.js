import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { savePlaylistToSpotify } from '../../util/spotify';





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



export default similarTracksPlaylistSlice.reducer;