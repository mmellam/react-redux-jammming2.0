import React from 'react';
import { useSelector } from 'react-redux';
import { selectSearchResults } from '../../features/playlistCreator/playlistCreatorSlice';
import TrackList from './TrackList';

const SearchResults = () => {
    const searchResults = useSelector(selectSearchResults);

    if (!searchResults.length) {
        return (
            <div>
                <h2>Results</h2>
                <p>No results</p>
            </div>
        )
    }
    return (
        <div>
            <h2>SearchResults</h2>
            <TrackList tracks={searchResults} isRemoval={false} />
        </div>
    );
}

export default SearchResults;