import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopArtistsList from './TopArtistsList';
import { selectTopArtists, selectLimitExceeded, selectSelectedArtists } from '../../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';
import { getTopArtists, getArtistBasedRecommendations } from '../../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';

const TopArtists = () => {
    const dispatch = useDispatch();
    const topArtists = useSelector(selectTopArtists);
    const limitExceeded = useSelector(selectLimitExceeded);
    const selectedArtists = useSelector(selectSelectedArtists);

    useEffect(() => {
        dispatch(getTopArtists());
    }, [dispatch]);

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

    return (
        <div className='top-artists'>
            <h2>TopArtists</h2>
            <TopArtistsList artists={topArtists}/>
            {limitExceeded ? <h3>Please select a maximum of 5 artists</h3> : null}
            {limitExceeded
                ? <button className='search-button' type='button' disabled>Get recommendations based on your selected artists</button>
                : <button className='search-button' type='button' onClick={onClickGetRecommendations}>Get recommendations based on your selected artists</button>
            }
        </div>
    );
}

export default TopArtists;