import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopArtistsList from './TopArtistsList';
import { selectTopArtists } from '../../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';
import { getTopArtists } from '../../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';

const TopArtists = () => {
    const dispatch = useDispatch();
    const topArtists = useSelector(selectTopArtists);

    useEffect(() => {
        dispatch(getTopArtists());
    }, [dispatch]);

    return (
        <div>
            <h2>TopArtists</h2>
            <TopArtistsList artists={topArtists}/>
        </div>

    );
}

export default TopArtists;