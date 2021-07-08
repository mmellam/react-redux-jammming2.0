import React from 'react';
import TrackList from './TrackList';

const SearchResults = (props) => {
    if (!props.tracks.length) {
        return (
            <div className='search-results'>
                <h2>Search Results</h2>
                <p className='no-results'>No results</p>
            </div>
        )
    }
    return (
        <div className='search-results'>
            <h2>Search Results</h2>
            <TrackList tracks={props.tracks} isRemoval={false} addTrack={props.addTrack} removeTrack={props.removeTrack} />
        </div>
    );
}

export default SearchResults;