import React from 'react';
import { useDispatch } from 'react-redux';

const Track = (props) => {
    const dispatch = useDispatch();

    const onClickAddTrack = (e) => {
        dispatch(props.addTrack(e.target.value));
    };

    const onClickRemoveTrack = (e) => {
        dispatch(props.removeTrack(e.target.value));
    };

    return (
        <div className='track'>
            <img src={props.track.image} alt='album cover' />
            <div className='track-info'>
                <h3>{props.track.name}</h3>
                <p> {props.track.artist} | {props.track.album}</p>
            </div>
            {props.isRemoval 
                ? <button value={props.track.id} onClick={onClickRemoveTrack}>−</button> 
                : <button value={props.track.id} onClick={onClickAddTrack}>+</button>
            }
        </div>
    );
}

export default Track;