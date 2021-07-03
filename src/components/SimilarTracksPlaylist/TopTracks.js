import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopTrackList from './TopTrackList';
import BrowseOptions from './BrowseOptions';
import { getTrackBasedRecommendations, selectLimitExceededTracks, selectSelectedTracks, selectShowBrowseOptions } from '../../features/similarTracksPlaylist/similarTracksPlaylistSlice';


const TopTracks = (props) => {
    const dispatch = useDispatch();

    const limitExceededTracks = useSelector(selectLimitExceededTracks);
    const selectedTracks = useSelector(selectSelectedTracks);
    //const showBrowseOptions = useSelector(selectShowBrowseOptions);
    const [showBrowseOptions, setShowBrowseOptions] = useState(false);

    const onClickDisplayOptions = () => {
        if (!showBrowseOptions) {
            setShowBrowseOptions(true);
        } else {
            setShowBrowseOptions(false);
        }
    };

    const onClickGetRecommendations = () => {
        console.log(selectedTracks);
        let queryString = '';
        for (let track of selectedTracks) {
            console.log(track.id)
            queryString += track.id + '%2C';
        }
        console.log(queryString)
        if (showBrowseOptions) {
            queryString += 'browseoptions';
        }

        dispatch(getTrackBasedRecommendations(queryString));
    };


    return (
        <div className='top-tracks'>
            <h2>TopTracks</h2>
            <TopTrackList tracks={props.tracks} />
            {limitExceededTracks ? <h3>Please select a maximum of 5 tracks</h3> : null}
            <button type='button' onClick={onClickDisplayOptions}>Filters</button>
            {showBrowseOptions ? <BrowseOptions /> : null}
            {limitExceededTracks
                ? <button type='button' disabled>Get recommendations based on your selected tracks</button>
                : <button type='button' onClick={onClickGetRecommendations}>Get recommendations based on your selected tracks</button>
            }
        </div>
    );
}

export default TopTracks;
