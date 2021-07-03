import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopTrackList from './TopTrackList';
import { getTrackBasedRecommendations, selectLimitExceededTracks } from '../../features/similarTracksPlaylist/similarTracksPlaylistSlice';


const TopTracks = (props) => {
    const dispatch = useDispatch();

    const limitExceededTracks = useSelector(selectLimitExceededTracks);

    const onClickGetRecommendations = () => {
        dispatch(getTrackBasedRecommendations())
    };


    return (
        <div className='top-tracks'>
            <h2>TopTracks</h2>
            <TopTrackList tracks={props.tracks} />
            {limitExceededTracks ? <h3>Please select a maximum of 5 tracks</h3> : null}
            {limitExceededTracks
                ? <button type='button' disabled>Get recommendations based on your selected tracks</button>
                : <button type='button' onClick={onClickGetRecommendations}>Get recommendations based on your selected tracks</button>
            }
        </div>
    );
}

export default TopTracks;
