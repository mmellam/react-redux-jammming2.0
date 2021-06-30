import { createSlice } from '@reduxjs/toolkit';

const connectToSpotifySlice = createSlice({
    name: 'connectToSpotify',
    initialState: {
        connected: false
    },
    reducers: {}
});

export default connectToSpotifySlice.reducer;