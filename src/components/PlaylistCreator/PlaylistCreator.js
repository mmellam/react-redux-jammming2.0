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
            <div className='playlist-creator-heading'>
                <h2>Playlist Creator</h2>
                <p>Search for songs, artists or albums and add songs to a new playlist in a few clicks.</p>
            </div>
            <SearchBar />
            <SearchResults tracks={searchResults} addTrack={addTrack} removeTrack={removeTrack} />
            <NewPlaylist tracks={newPlaylist} savePlaylist={saveCreatedPlaylist} addTrack={addTrack} removeTrack={removeTrack} />
        </div>
    );
}

export default PlaylistCreator;