import React from 'react';
import TopTrack from './TopTrack';

const TopTrackList = (props) => {
    return (
        <div>
        {
            props.tracks.map(track => {
                return <TopTrack track={track} 
                    key={track.id} />
            })
        }
        </div>
    );
}

export default TopTrackList;