import React from 'react';
import { useSelector } from 'react-redux';
import './playlistCreator.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import NewPlaylist from './NewPlaylist';
import { saveCreatedPlaylist,
    selectSearchResults,
    selectNewPlaylist,
    addTrack,
    removeTrack,
    selectPlaylistSaved, 
    selectFailedResults,
    selectFailedPlaylist} from '../../features/playlistCreator/playlistCreatorSlice';


const PlaylistCreator = () => {
    const searchResults = useSelector(selectSearchResults);
    const newPlaylist = useSelector(selectNewPlaylist);
    const playlistSaved = useSelector(selectPlaylistSaved);
    const failedResults = useSelector(selectFailedResults);
    const failedPlaylist = useSelector(selectFailedPlaylist);

    return (
        <div className='playlist-creator'>
            <div className='playlist-creator-heading'>
                <h2>Playlist Creator by Search</h2>
                <p>Search for songs, artists or albums and add songs to a new playlist in a few clicks.</p>
            </div>
            <SearchBar />
            <SearchResults 
                tracks={searchResults} 
                addTrack={addTrack}
                failedResults={failedResults} />
            <NewPlaylist 
                tracks={newPlaylist} 
                savePlaylist={saveCreatedPlaylist} 
                removeTrack={removeTrack}
                showMessage={playlistSaved}
                failedPlaylist={failedPlaylist} />
        </div>
    );
}


export default PlaylistCreator;