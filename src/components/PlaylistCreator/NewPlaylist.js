import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TrackList from './TrackList';
import logo from './Spotify_Icon_RGB_White.png';
import ErrorMessage from '../NavBar/ErrorMessage';
import { resetPlaylistSaved } from '../../features/playlistCreator/playlistCreatorSlice';


const NewPlaylist = (props) => {
    const dispatch = useDispatch();
    const [playlistName, setPlaylistName] = useState('New Playlist');

    useEffect(() => {
        dispatch(resetPlaylistSaved());
    }, [dispatch]);

    const handleNameChange = (e) => {
        setPlaylistName(e.target.value);
    };
    const handleFocus = (e) => {
        if (e.target.value === 'New Playlist') {
            setPlaylistName('');
        }
    };
    const handleBlur = (e) => {
        if (!e.target.value || e.target.value[0] === ' ') {
            setPlaylistName('New Playlist');
        }
    };
    const onClickSavePlaylist = async () => {
        const trackUris = props.tracks.map(track => track.uri);
        dispatch(props.savePlaylist({ playlistName, trackUris }));
        setPlaylistName('New Playlist');
        const trackArray = Array.from(document.getElementsByClassName('track'));
        trackArray.forEach((track) => track.style.backgroundColor = '');
    };

    if (props.failedPlaylist) {
        return <ErrorMessage />
    };

    return (
        <div className='track-container new-playlist'>
            <input 
                value={playlistName}
                onChange={handleNameChange} 
                onFocus={handleFocus}
                onBlur={handleBlur} />
            <TrackList 
                tracks={props.tracks} 
                isRemoval={true} 
                addTrack={props.addTrack} 
                removeTrack={props.removeTrack}
                showMessage={props.showMessage} />
            {props.tracks.length 
                ? <button 
                    className='rounded-button save-button' 
                    onClick={onClickSavePlaylist}>
                        <img src={logo} alt='spotify' />SAVE TO SPOTIFY</button> 
                : null}
        </div>
    );
}

export default NewPlaylist;