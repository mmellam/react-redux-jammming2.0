import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopTracks, selectTopTracks } from '../../features/similarTracksPlaylist/similarTracksPlaylistSlice';
import TrackList from '../PlaylistCreator/TrackList';


const TopTracks = () => {
    const dispatch = useDispatch();
    // const topTracks = useSelector(selectTopTracks);

    useEffect(() => {
        dispatch(getTopTracks());
    }, [dispatch]);

    return (
        <div>
            <h2>TopTracks</h2>
            
        </div>
    );
}

export default TopTracks;

//<TrackList tracks={topTracks} isRemoval={false} />