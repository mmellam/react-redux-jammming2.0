import React, { useEffect } from 'react';
import TopTracks from './TopTracks';
import SearchResults from '../PlaylistCreator/SearchResults';
import NewPlaylist from '../PlaylistCreator/NewPlaylist';
import { useDispatch, useSelector } from 'react-redux';
import { addTrackTrackPlaylist, getTopTracks, removeTrackTrackPlaylist, saveSimilarTracksPlaylist, selectRecommendedTracks, selectTopTracks, selectTopTracksPlaylist, toggleTrackSelection } from '../../features/similarTracksPlaylist/similarTracksPlaylistSlice';
import './similarTracksPlaylist.css';

const SimilarTracksPlaylist = () => {
    const dispatch = useDispatch();
    const topTracks = useSelector(selectTopTracks);
    const recommendedTracks = useSelector(selectRecommendedTracks);
    const topTracksPlaylist = useSelector(selectTopTracksPlaylist);

    useEffect(() => {
        dispatch(getTopTracks());
    }, [dispatch]);


    return (
        <div className='track-playlist'>
            <h2>SimilarTracksPlaylist</h2>
            <TopTracks tracks={topTracks} addTrack={toggleTrackSelection} />
            <SearchResults tracks={recommendedTracks} addTrack={addTrackTrackPlaylist} />
            <NewPlaylist tracks={topTracksPlaylist} savePlaylist={saveSimilarTracksPlaylist} removeTrack={removeTrackTrackPlaylist} />
        </div>
    );
}

export default SimilarTracksPlaylist;

/*
            
      
            */