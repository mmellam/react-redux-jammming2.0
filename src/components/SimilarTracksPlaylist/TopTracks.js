import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopTrackList from './TopTrackList';
import BrowseOptions from './BrowseOptions';
import { 
    getTrackBasedRecommendations, 
    getTopTracks, 
    selectTopTracks, 
    selectLimitExceededTracks, 
    selectSelectedTracks, 
    selectBrowseOptions,
    clearSelectedTracks } from '../../features/similarTracksPlaylist/similarTracksPlaylistSlice';
import ErrorMessage from '../NavBar/ErrorMessage';


const TopTracks = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearSelectedTracks());
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
        let queryString = '';
        for (let track of selectedTracks) {
            queryString += track.id + '%2C';
        }
        if (showBrowseOptions) {
            queryString += '&';
            //console.log(browseOptions)
            for (let option of browseOptions) {
                queryString += option.name + '=' + option.value + '&';
            }
        }
        dispatch(getTrackBasedRecommendations(queryString));
    };

    const renderButton = () => {
        if (selectedTracks.length && !limitExceededTracks) {
            return <button className='rounded-button get-button' type='button' onClick={onClickGetRecommendations}>Get song recommendations</button>
        } else {
            return <button className='rounded-button get-button' type='button' disabled>Get song recommendations</button>
        }
    };

    if (props.failedResults) {
        return <ErrorMessage />
    };

    return (
        <div className='top-tracks'>
            <h3 className='small-heading'>Your Top Tracks</h3>
            <TopTrackList tracks={topTracks} />
            {limitExceededTracks && <p className='limit'>Please select a maximum of 5 tracks</p>}
            <button className='rounded-button filter-button' type='button' onClick={onClickDisplayOptions}>Select song characteristics</button>
            {showBrowseOptions && <BrowseOptions />}
            {renderButton()}
        </div>
    );
}

export default TopTracks;
