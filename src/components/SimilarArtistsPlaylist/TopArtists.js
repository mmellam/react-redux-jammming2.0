import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopArtistsList from './TopArtistsList';
import { selectTopArtists, selectLimitExceeded } from '../../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';
import { getTopArtists } from '../../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';

const TopArtists = () => {
    const dispatch = useDispatch();
    const topArtists = useSelector(selectTopArtists);
    const limitExceeded = useSelector(selectLimitExceeded);

    useEffect(() => {
        dispatch(getTopArtists());
    }, [dispatch]);

    return (
        <div>
            <h2>TopArtists</h2>
            <TopArtistsList artists={topArtists}/>
            {limitExceeded ? <h3>Please select a maximum of 5 artists</h3> : null}
        </div>

    );
}

export default TopArtists;