import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import PlaylistCreator from './components/PlaylistCreator/PlaylistCreator';
import SimilarTracksPlaylist from './components/SimilarTracksPlaylist/SimilarTracksPlaylist';
import SimilarArtistsPlaylist from './components/SimilarArtistsPlaylist/SimilarArtistsPlaylist';
import ConnectButton from './components/NavBar/ConnectButton';
import Start from './components/NavBar/Start';
import { openNav } from './domfunctions';

function App() {
  return (  
    <Router>
      <div className='app'>
        <header className='navbar'>
          <h1>
              <Link to='/'>ja<span>mmm</span>ing.</Link>
          </h1>
          <nav>
              <ul>
                  <li>
                      <Link to='/playlist-creator'>Search</Link>
                  </li>
                  <li>
                      <Link to='/magic-playlist-tracks'>By Song</Link>
                  </li>
                  <li>
                      <Link to='/magic-playlist-artists'>By Artist</Link>
                  </li>
              </ul>
          </nav>
          <ConnectButton />
          <p>Jammming is a Playlist Creator that uses the Spotify Web API to allow you to easily generate playlists of your favorite music and explore new songs based on your listening history.</p>
        </header>
        <Switch>
            <Route path='/playlist-creator'>
                <PlaylistCreator />
            </Route>
            <Route path='/magic-playlist-tracks'>
                <SimilarTracksPlaylist />
            </Route>
            <Route path='/magic-playlist-artists'>
                <SimilarArtistsPlaylist />
            </Route>
            <Route path='/start'>
                <Start />
            </Route>
            <Route path='/'>
                <PlaylistCreator />
            </Route>
        </Switch>
        <footer>Hi</footer>
      </div>  
    </Router>
  );
}


export default App;
