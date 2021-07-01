import React from 'react';
import { useSelector } from 'react-redux';
import { selectNewPlaylist } from '../../features/playlistCreator/playlistCreatorSlice';
import TrackList from './TrackList';

const NewPlaylist = () => {
    const newPlaylist = useSelector(selectNewPlaylist);

    return (
        <div>
            <h2>NewPlaylist</h2>
            <TrackList tracks={newPlaylist} isRemoval={true} />
        </div>
    );
}

export default NewPlaylist;