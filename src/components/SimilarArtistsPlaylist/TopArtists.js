import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopArtistsList from './TopArtistsList';
import { selectTopArtists, selectLimitExceeded } from '../../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';
import { getTopArtists, getArtistBasedRecommendations } from '../../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';

const TopArtists = () => {
    const dispatch = useDispatch();
    const topArtists = useSelector(selectTopArtists);
    const limitExceeded = useSelector(selectLimitExceeded);

    useEffect(() => {
        dispatch(getTopArtists());
    }, [dispatch]);

    const onClickGetRecommendations = () => {
        dispatch(getArtistBasedRecommendations());
    }

    return (
        <div>
            <h2>TopArtists</h2>
            <TopArtistsList artists={topArtists}/>
            {limitExceeded ? <h3>Please select a maximum of 5 artists</h3> : null}
            <button type='button' onClick={onClickGetRecommendations}>Get recommendations based on your selected artists</button>
        </div>
    );
}

export default TopArtists;