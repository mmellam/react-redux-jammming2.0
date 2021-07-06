import React from 'react';
import { useDispatch} from 'react-redux';
import { checkLimitExceededTracks, toggleTrackSelection } from '../../features/similarTracksPlaylist/similarTracksPlaylistSlice';

const TopTrack = (props) => {
    const dispatch = useDispatch();

    const onClickToggleTrackSelection = (e) => {
        dispatch(toggleTrackSelection(e.target.value));
        dispatch(checkLimitExceededTracks());
    }

    return (
        <div className='top-track'>
            <div className='top-track-info'>
                <h3>{props.track.name}</h3>
                <p> {props.track.artist} | {props.track.album}</p>
            </div>
            <label htmlFor={props.track.id}></label>
            <input type='checkbox' id={props.track.id} name={props.track.name} value={props.track.id}
                onClick={onClickToggleTrackSelection}/>
        </div>
    );
}

export default TopTrack;