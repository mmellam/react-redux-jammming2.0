import React from 'react';
import Track from './Track';
import SavedMessage from './SavedMessage';

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
        {props.showMessage && <SavedMessage />}
        </div>
    );
}

export default TrackList;