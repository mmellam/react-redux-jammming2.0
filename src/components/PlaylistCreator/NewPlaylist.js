import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TrackList from './TrackList';
import { savePlaylist } from '../../features/playlistCreator/playlistCreatorSlice';


const NewPlaylist = (props) => {
    const dispatch = useDispatch();
    const [playlistName, setPlaylistName] = useState('New Playlist');

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
        dispatch(savePlaylist({ playlistName, trackUris }));
        setPlaylistName('New Playlist');
    };

    return (
        <div>
            <input value={playlistName} onChange={handleNameChange} 
                onFocus={handleFocus} onBlur={handleBlur} />
            <TrackList tracks={props.tracks} isRemoval={true} />
            <button className="Playlist-save" onClick={onClickSavePlaylist}>SAVE TO SPOTIFY</button>
        </div>
    );
}

export default NewPlaylist;