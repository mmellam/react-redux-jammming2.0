import React from 'react';
import Track from './Track';

const TrackList = (props) => {
    return (
        <div>
        {
            props.tracks.map(track => {
                return <Track track={track} 
                    key={track.id}
                    isRemoval={props.isRemoval} />
            })
        }
        </div>
    );
}

export default TrackList;