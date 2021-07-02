import React from 'react';
import TopArtists from './TopArtists';
import NewPlaylist from '../PlaylistCreator/NewPlaylist';
import SearchResults from '../PlaylistCreator/SearchResults';
import { useSelector } from 'react-redux';
import { selectTopArtistsPlaylist, 
    selectRecommendedTracksArtist, 
    saveSimilarArtistsPlaylist, 
    addTrackArtistPlaylist, 
    removeTrackArtistPlaylist 
    } from '../../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';

const SimilarArtistsPlaylist = () => {
    const topArtistsPlaylist = useSelector(selectTopArtistsPlaylist);
    const recommendedTracksArtist = useSelector(selectRecommendedTracksArtist);

    return (
        <div>
            <h2>SimilarArtistsPlaylist</h2>
            <TopArtists />
            <SearchResults tracks={recommendedTracksArtist} addTrack={addTrackArtistPlaylist} removeTrack={removeTrackArtistPlaylist}/>
            <NewPlaylist tracks={topArtistsPlaylist} savePlaylist={saveSimilarArtistsPlaylist} addTrack={addTrackArtistPlaylist} removeTrack={removeTrackArtistPlaylist} />
        </div>
    );
}

export default SimilarArtistsPlaylist;