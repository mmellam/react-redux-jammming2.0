import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTrackSelection } from '../../features/similarTracksPlaylist/similarTracksPlaylistSlice';

const TopTrack = (props) => {
    const dispatch = useDispatch();

    const onClickToggleTrackSelection = (e) => {
        dispatch(toggleTrackSelection(e.target.value));

    }

    return (
        <div>
            <div>
                <h3>{props.track.name}</h3>
                <p> {props.track.artist} | {props.track.album}</p>
            </div>
            {<button value={props.track.id} onClick={onClickToggleTrackSelection}>-</button>}
        </div>

    );
}

export default TopTrack;