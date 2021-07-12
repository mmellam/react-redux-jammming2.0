import React from 'react';
import ErrorMessage from '../NavBar/ErrorMessage';
import TrackList from './TrackList';

const SearchResults = (props) => {
    if (props.failedResults) {
        return <ErrorMessage />
    }
    if (!props.tracks.length) {
        return (
            <div className='track-container search-results'>
                <h2>Search Results</h2>
                <p className='no-results'>No results</p>
            </div>
        )
    };
    return (
        <div className='track-container search-results'>
            <h2>Search Results</h2>
            <TrackList 
                tracks={props.tracks} 
                isRemoval={false} 
                addTrack={props.addTrack} 
                removeTrack={props.removeTrack} />
        </div>
    );
}

export default SearchResults;