import { configureStore } from '@reduxjs/toolkit';
import playlistCreatorReducer from '../features/playlistCreator/playlistCreatorSlice';

export default configureStore({
    reducer: {
        playlistCreator: playlistCreatorReducer
    }
});