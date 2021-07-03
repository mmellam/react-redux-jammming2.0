import React from 'react';
import { useDispatch } from 'react-redux';
import { getTrackBasedRecommendations } from '../../features/similarTracksPlaylist/similarTracksPlaylistSlice';
import TrackList from '../PlaylistCreator/TrackList';


const TopTracks = (props) => {
    const dispatch = useDispatch();

    const onClickGetRecommendations = () => {
        dispatch(getTrackBasedRecommendations())
    }


    return (
        <div>
            <h2>TopTracks</h2>
            <TrackList tracks={props.tracks} isRemoval={false} />
            <button type='button' onClick={onClickGetRecommendations}>Get recommendations based on your selected tracks</button>
        </div>
    );
}

export default TopTracks;
