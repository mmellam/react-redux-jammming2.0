import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopTrackList from './TopTrackList';
import BrowseOptions from './BrowseOptions';
import { getTrackBasedRecommendations, 
    getTopTracks, 
    selectTopTracks, 
    selectLimitExceededTracks, 
    selectSelectedTracks, 
    selectBrowseOptions } from '../../features/similarTracksPlaylist/similarTracksPlaylistSlice';


const TopTracks = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTopTracks());
    }, [dispatch]);

    const topTracks = useSelector(selectTopTracks);
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
            <h3>Your Top Tracks</h3>
            <TopTrackList tracks={topTracks} />
            {limitExceededTracks ? <h3>Please select a maximum of 5 tracks</h3> : null}
            <button className='rounded-button filter-button' type='button' onClick={onClickDisplayOptions}>Select song characteristics</button>
            {showBrowseOptions ? <BrowseOptions /> : null}
            {limitExceededTracks
                ? <button className='rounded-button get-button' type='button' disabled>Get song recommendations</button>
                : <button className='rounded-button get-button' type='button' onClick={onClickGetRecommendations}>Get song recommendations</button>
            }
        </div>
    );
}

export default TopTracks;
