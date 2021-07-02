import React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import NewPlaylist from './NewPlaylist';
import { useSelector } from 'react-redux';
import { selectSearchResults } from '../../features/playlistCreator/playlistCreatorSlice';
import { selectNewPlaylist } from '../../features/playlistCreator/playlistCreatorSlice';

const PlaylistCreator = () => {
    const searchResults = useSelector(selectSearchResults);
    const newPlaylist = useSelector(selectNewPlaylist);

    return (
        <div>
            <h2>PlaylistCreator</h2>
            <SearchBar />
            <SearchResults tracks={searchResults} />
            <NewPlaylist tracks={newPlaylist} />
        </div>
    );
}

export default PlaylistCreator;