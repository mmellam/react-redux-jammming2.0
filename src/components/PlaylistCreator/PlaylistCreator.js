import React from 'react';
import './playlistCreator.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import NewPlaylist from './NewPlaylist';
import { useSelector } from 'react-redux';
import { saveCreatedPlaylist, selectSearchResults } from '../../features/playlistCreator/playlistCreatorSlice';
import { selectNewPlaylist } from '../../features/playlistCreator/playlistCreatorSlice';
import { addTrack, removeTrack } from '../../features/playlistCreator/playlistCreatorSlice';

const PlaylistCreator = () => {
    const searchResults = useSelector(selectSearchResults);
    const newPlaylist = useSelector(selectNewPlaylist);

    return (
        <div className='playlist-creator'>
            <h2>PlaylistCreator</h2>
            <SearchBar />
            <SearchResults tracks={searchResults} addTrack={addTrack} removeTrack={removeTrack} />
            <NewPlaylist tracks={newPlaylist} savePlaylist={saveCreatedPlaylist} addTrack={addTrack} removeTrack={removeTrack} />
        </div>
    );
}

export default PlaylistCreator;