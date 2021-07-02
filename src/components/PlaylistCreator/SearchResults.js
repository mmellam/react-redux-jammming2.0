import React from 'react';
import TrackList from './TrackList';

const SearchResults = (props) => {
    if (!props.tracks.length) {
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
            <TrackList tracks={props.tracks} isRemoval={false} />
        </div>
    );
}

export default SearchResults;