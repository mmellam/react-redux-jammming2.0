import React from 'react';
import TrackList from '../PlaylistCreator/TrackList';


const TopTracks = (props) => {




    return (
        <div>
            <h2>TopTracks</h2>
            <TrackList tracks={props.tracks} isRemoval={false} />
        </div>
    );
}

export default TopTracks;
