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
            <div className='playlist-creator-heading'>
                <h2>Playlist Creator by Song</h2>
                <p>Create a playlist based on up to 5 of your most streamed songs and your preferred song characteristics. Get new suggestions with each button click.</p>
            </div>
            <TopTracks tracks={topTracks} addTrack={toggleTrackSelection} />
            <SearchResults tracks={recommendedTracks} addTrack={addTrackTrackPlaylist} />
            <NewPlaylist tracks={topTracksPlaylist} savePlaylist={saveSimilarTracksPlaylist} removeTrack={removeTrackTrackPlaylist} />
        </div>
    );
}

export default SimilarTracksPlaylist;

/*
            
      
            */