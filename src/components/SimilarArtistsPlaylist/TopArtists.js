import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopArtistsList from './TopArtistsList';
import { 
    selectTopArtists, 
    selectLimitExceeded, 
    selectSelectedArtists,
    getTopArtists, 
    getArtistBasedRecommendations, 
    clearSelectedArtists } from '../../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';
import ErrorMessage from '../NavBar/ErrorMessage';

const TopArtists = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearSelectedArtists());
        dispatch(getTopArtists());
    }, [dispatch]);

    const topArtists = useSelector(selectTopArtists);
    const limitExceeded = useSelector(selectLimitExceeded);
    const selectedArtists = useSelector(selectSelectedArtists);

    const onClickGetRecommendations = () => {
        console.log(selectedArtists);
        let queryString = '';
        for (let artist of selectedArtists) {
            console.log(artist.id)
            queryString += artist.id + '%2C';
        }
        console.log(queryString)
        dispatch(getArtistBasedRecommendations(queryString));
    };

    if (props.failedResults) {
        return <ErrorMessage />
    };

    return (
        <div className='top-artists'>
            <h3>Your Top Artists</h3>
            <TopArtistsList artists={topArtists}/>
            {limitExceeded ? <h3>Please select a maximum of 5 artists</h3> : null}
            {limitExceeded
                ? <button className='rounded-button get-button' type='button' disabled>Get song recommendations</button>
                : <button className='rounded-button get-button' type='button' onClick={onClickGetRecommendations}>Get song recommendations</button>
            }
        </div>
    );
}

export default TopArtists;