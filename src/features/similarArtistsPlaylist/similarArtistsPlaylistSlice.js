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

export const savePlaylist = createAsyncThunk(
    'similarArtistsPlaylist/savePlaylist',
    async (playlistToCreate) => {
        savePlaylistToSpotify(playlistToCreate);
    }
);

const similarArtistsPlaylistSlice = createSlice({
    name: 'similarArtistsPlaylist',
    initialState: {
        topArtists: [],
        selectedArtists: [],
        topArtistsPlaylist: []
    },
    reducers: {
        toggleArtistSelection: (state, action) => {
            const artist = state.topArtists.filter((artist) => artist.id === action.payload);
            if (!state.selectedArtists.find((artist) => artist.id === action.payload)) {
                state.selectedArtists.push(...artist);
            } else {
                state.selectedArtists = state.selectedArtists.filter((artist) => artist.id !== action.payload);
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

        [savePlaylist.pending]: (state) => {

        },
        [savePlaylist.fulfilled]: (state, action) => {
            //console.log(action.payload)
            //state.topArtistsPlaylist = [];
        },
        [savePlaylist.rejected]: (state, action) => {

        }
    }
});

export const { toggleArtistSelection } = similarArtistsPlaylistSlice.actions;

export const selectTopArtists = (state) => state.similarArtistsPlaylist.topArtists;
export const selectTopArtistsPlaylist = (state) => state.similarArtistsPlaylist.topArtistsPlaylist;

export default similarArtistsPlaylistSlice.reducer;