import { configureStore } from '@reduxjs/toolkit';
import playlistCreatorReducer from '../features/playlistCreator/playlistCreatorSlice';
import connectToSpotifyReducer from '../features/connectToSpotify/connectToSpotifySlice';

export default configureStore({
    reducer: {
        playlistCreator: playlistCreatorReducer,
        connectToSpotify: connectToSpotifyReducer
    }
});