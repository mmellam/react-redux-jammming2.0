import React, { useEffect } from 'react';
import TopTracks from './TopTracks';
import { useDispatch, useSelector } from 'react-redux';
import { getTopTracks, selectTopTracks } from '../../features/similarTracksPlaylist/similarTracksPlaylistSlice';


const SimilarTracksPlaylist = () => {
    const dispatch = useDispatch();
    const topTracks = useSelector(selectTopTracks);
    console.log(topTracks)

    useEffect(() => {
        dispatch(getTopTracks());
    }, [dispatch]);


    return (
        <div>
            <h2>SimilarTracksPlaylist</h2>
            <TopTracks tracks={topTracks} />
        </div>
    );
}

export default SimilarTracksPlaylist;