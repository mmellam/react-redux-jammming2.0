import { configureStore } from '@reduxjs/toolkit';
import playlistCreatorReducer from '../features/playlistCreator/playlistCreatorSlice';
import similarArtistsPlaylistReducer from '../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';
import similarTracksPlaylistReducer from '../features/similarTracksPlaylist/similarTracksPlaylistSlice';

export default configureStore({
    reducer: {
        playlistCreator: playlistCreatorReducer,
        similarArtistsPlaylist: similarArtistsPlaylistReducer,
        similarTracksPlaylist: similarTracksPlaylistReducer
    }
});