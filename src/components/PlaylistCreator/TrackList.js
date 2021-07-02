import React from 'react';
import Track from './Track';

const TrackList = (props) => {
    return (
        <div>
        {
            props.tracks.map(track => {
                return <Track track={track} 
                    key={track.id}
                    isRemoval={props.isRemoval}
                    addTrack={props.addTrack} 
                    removeTrack={props.removeTrack} />
            })
        }
        </div>
    );
}

export default TrackList;