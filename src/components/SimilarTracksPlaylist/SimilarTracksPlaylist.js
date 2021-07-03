import React, { useEffect } from 'react';
import TopTracks from './TopTracks';
import SearchResults from '../PlaylistCreator/SearchResults';
import NewPlaylist from '../PlaylistCreator/NewPlaylist';
import { useDispatch, useSelector } from 'react-redux';
import { getTopTracks, saveSimilarTracksPlaylist, selectRecommendedTracks, selectTopTracks, selectTopTracksPlaylist } from '../../features/similarTracksPlaylist/similarTracksPlaylistSlice';


const SimilarTracksPlaylist = () => {
    const dispatch = useDispatch();
    const topTracks = useSelector(selectTopTracks);
    const recommendedTracks = useSelector(selectRecommendedTracks);
    const topTracksPlaylist = useSelector(selectTopTracksPlaylist);

    useEffect(() => {
        dispatch(getTopTracks());
    }, [dispatch]);


    return (
        <div>
            <h2>SimilarTracksPlaylist</h2>
            <TopTracks tracks={topTracks} />
            <SearchResults tracks={recommendedTracks} />
            <NewPlaylist tracks={topTracksPlaylist} savePlaylist={saveSimilarTracksPlaylist} />
        </div>
    );
}

export default SimilarTracksPlaylist;

/*
            
      
            */