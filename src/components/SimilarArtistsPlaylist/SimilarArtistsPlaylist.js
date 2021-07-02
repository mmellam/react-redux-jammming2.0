import React from 'react';
import TopArtists from './TopArtists';
import NewPlaylist from '../PlaylistCreator/NewPlaylist';
import SearchResults from '../PlaylistCreator/SearchResults';
import { useSelector } from 'react-redux';
import { selectTopArtistsPlaylist, selectRecommendedTracksArtist } from '../../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';

const SimilarArtistsPlaylist = () => {
    const topArtistsPlaylist = useSelector(selectTopArtistsPlaylist);
    const recommendedTracksArtist = useSelector(selectRecommendedTracksArtist);

    return (
        <div>
            <h2>SimilarArtistsPlaylist</h2>
            <TopArtists />
            <SearchResults tracks={recommendedTracksArtist} />
            <NewPlaylist tracks={topArtistsPlaylist} />
        </div>
    );
}

export default SimilarArtistsPlaylist;