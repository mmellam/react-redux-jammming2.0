import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleArtistSelection, checkLimitExceeded } from '../../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';

const Artist = (props) => {
    const dispatch = useDispatch();

    const onClickToggleArtistSelection = (e) => {
        dispatch(toggleArtistSelection(e.target.value));
        dispatch(checkLimitExceeded());
    };

    return (
        <div className='artist'>
            <img src={props.artist.image.url} alt='Artist'/>
            <h3>{props.artist.name}</h3>
            <p>{props.artist.genre}</p>
            <label htmlFor={props.artist.id}></label>
            <input 
                type='checkbox' 
                id={props.artist.id} 
                name={props.artist.name} 
                value={props.artist.id}
                onClick={onClickToggleArtistSelection} 
                />
        </div>
    );
}

export default Artist;