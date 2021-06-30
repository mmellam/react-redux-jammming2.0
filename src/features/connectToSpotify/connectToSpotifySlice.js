import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAccessToken = createAsyncThunk(
    'connectToSpotify/getAccessToken',
    async () => {

    }
)




const connectToSpotifySlice = createSlice({
    name: 'connectToSpotify',
    initialState: {
        connected: false
    },
    extraReducers: {

    }
})


export default connectToSpotifySlice.reducer;