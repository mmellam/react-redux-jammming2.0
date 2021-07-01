import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTopArtistsPlaylist } from '../../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';
import TrackList from '../PlaylistCreator/TrackList';
import { savePlaylist } from '../../features/playlistCreator/playlistCreatorSlice';


const NewPlaylist = () => {
    const dispatch = useDispatch();
    const topArtistsPlaylist = useSelector(selectTopArtistsPlaylist);
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
        const trackUris = topArtistsPlaylist.map(track => track.uri);
        dispatch(savePlaylist({ playlistName, trackUris }));
        setPlaylistName('New Playlist');
    };

    return (
        <div>
            <input value={playlistName} onChange={handleNameChange} 
                onFocus={handleFocus} onBlur={handleBlur} />
            <TrackList tracks={topArtistsPlaylist} isRemoval={true} />
            <button className="Playlist-save" onClick={onClickSavePlaylist}>SAVE TO SPOTIFY</button>
        </div>
    );
}

export default NewPlaylist;