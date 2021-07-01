import React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import NewPlaylist from './NewPlaylist';

const PlaylistCreator = () => {
    return (
        <div>
            <h2>PlaylistCreator</h2>
            <SearchBar />
            <SearchResults />
            <NewPlaylist />
        </div>
    );
}

export default PlaylistCreator;