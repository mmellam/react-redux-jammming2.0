import React from 'react';
import TopArtists from './TopArtists';
import NewPlaylist from '../PlaylistCreator/NewPlaylist';
import SearchResults from '../PlaylistCreator/SearchResults';
import RequireLogin from '../NavBar/RequireLogin';
import './similarArtistsPlaylist.css';
import { useSelector } from 'react-redux';
import { selectTopArtistsPlaylist, 
    selectRecommendedTracksArtist, 
    saveSimilarArtistsPlaylist, 
    addTrackArtistPlaylist, 
    removeTrackArtistPlaylist, 
    selectArtistPlaylistSaved,
    selectFailedResultsArtist,
    selectFailedRecArtist,
    selectFailedPlaylistArtist
    } from '../../features/similarArtistsPlaylist/similarArtistsPlaylistSlice';

const SimilarArtistsPlaylist = () => {
    const topArtistsPlaylist = useSelector(selectTopArtistsPlaylist);
    const recommendedTracksArtist = useSelector(selectRecommendedTracksArtist);
    const artistPlaylistSaved = useSelector(selectArtistPlaylistSaved);
    const failedResultsArtist = useSelector(selectFailedResultsArtist);
    const failedRecArtist = useSelector(selectFailedRecArtist);
    const failedPlaylistArtist = useSelector(selectFailedPlaylistArtist);

    return (
        <div className='artist-playlist'>
            <div className='playlist-creator-heading'>
                <h2>Playlist Creator by Artist</h2>
                <p>Create a playlist based on up to 5 of your most streamed artists. Get new suggestions with each button click.</p>
            </div>
            {window.sessionStorage.accessToken ? <TopArtists failedResults={failedResultsArtist} /> : <RequireLogin />}
            <SearchResults 
                tracks={recommendedTracksArtist} 
                addTrack={addTrackArtistPlaylist}
                failedResults={failedRecArtist} />
            <NewPlaylist 
                tracks={topArtistsPlaylist} 
                savePlaylist={saveSimilarArtistsPlaylist} 
                removeTrack={removeTrackArtistPlaylist}
                showMessage={artistPlaylistSaved}
                failedPlaylist={failedPlaylistArtist} />
        </div>
    );
}

export default SimilarArtistsPlaylist;