import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopArtistsList from './TopArtistsList';
import { selectTopArtists, selectLimitExceeded, selectSelectedArtists } from '../../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';
import { getTopArtists, getArtistBasedRecommendations } from '../../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';

const TopArtists = () => {
    const dispatch = useDispatch();
    useEffect(() => {
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

    
    return (
        <div className='top-artists'>
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