import React from 'react';
import { useDispatch } from 'react-redux';
import { getTrackBasedRecommendations } from '../../features/similarTracksPlaylist/similarTracksPlaylistSlice';
import { TopTrackList } from './TopTrackList';


const TopTracks = (props) => {
    const dispatch = useDispatch();

    const onClickGetRecommendations = () => {
        dispatch(getTrackBasedRecommendations())
    }


    return (
        <div className='top-tracks'>
            <h2>TopTracks</h2>
            <TopTrackList tracks={props.tracks} />
            <button type='button' onClick={onClickGetRecommendations}>Get recommendations based on your selected tracks</button>
        </div>
    );
}

export default TopTracks;
