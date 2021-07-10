import React from 'react';
import { useSelector } from 'react-redux';
import TopTracks from './TopTracks';
import SearchResults from '../PlaylistCreator/SearchResults';
import NewPlaylist from '../PlaylistCreator/NewPlaylist';
import RequireLogin from '../NavBar/RequireLogin';
import { addTrackTrackPlaylist, removeTrackTrackPlaylist, saveSimilarTracksPlaylist, selectRecommendedTracks, selectTopTracksPlaylist } from '../../features/similarTracksPlaylist/similarTracksPlaylistSlice';
import './similarTracksPlaylist.css';

const SimilarTracksPlaylist = () => {
    const recommendedTracks = useSelector(selectRecommendedTracks);
    const topTracksPlaylist = useSelector(selectTopTracksPlaylist);


    return (
        <div className='track-playlist'>
            <div className='playlist-creator-heading'>
                <h2>Playlist Creator by Song</h2>
                <p>Create a playlist based on up to 5 of your most streamed songs and your preferred song characteristics. Get new suggestions with each button click.</p>
            </div>
            {window.sessionStorage.accessToken ? <TopTracks /> : <RequireLogin />}
            <SearchResults tracks={recommendedTracks} addTrack={addTrackTrackPlaylist} />
            <NewPlaylist tracks={topTracksPlaylist} savePlaylist={saveSimilarTracksPlaylist} removeTrack={removeTrackTrackPlaylist} />
        </div>
    );
}

export default SimilarTracksPlaylist;
