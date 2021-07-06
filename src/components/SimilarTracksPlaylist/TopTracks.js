import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopTrackList from './TopTrackList';
import BrowseOptions from './BrowseOptions';
import { getTrackBasedRecommendations, selectLimitExceededTracks, selectSelectedTracks, selectBrowseOptions } from '../../features/similarTracksPlaylist/similarTracksPlaylistSlice';


const TopTracks = (props) => {
    const dispatch = useDispatch();

    const limitExceededTracks = useSelector(selectLimitExceededTracks);
    const selectedTracks = useSelector(selectSelectedTracks);
    const browseOptions = useSelector(selectBrowseOptions);
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
        if (showBrowseOptions) {
            queryString += '&';
            console.log(browseOptions)
            for (let option of browseOptions) {
                queryString += option.name + '=' + option.value + '&';
            }
        }
        console.log(queryString)
        dispatch(getTrackBasedRecommendations(queryString));
    };


    return (
        <div className='top-tracks'>
            <h2>TopTracks</h2>
            <TopTrackList tracks={props.tracks} />
            {limitExceededTracks ? <h3>Please select a maximum of 5 tracks</h3> : null}
            <button className='filter-button' type='button' onClick={onClickDisplayOptions}>Filters</button>
            {showBrowseOptions ? <BrowseOptions /> : null}
            {limitExceededTracks
                ? <button className='search-button' type='button' disabled>Get recommendations based on your selected tracks</button>
                : <button className='search-button' type='button' onClick={onClickGetRecommendations}>Get recommendations based on your selected tracks</button>
            }
        </div>
    );
}

export default TopTracks;
