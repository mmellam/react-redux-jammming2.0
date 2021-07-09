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
import LogoutButton from './components/NavBar/LogoutButton';
import Start from './components/NavBar/Start';
import { openNav } from './domfunctions';
import { logout } from './util/spotify';

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
                      <Link to='/playlist-creator'>By Search</Link>
                  </li>
                  <li>
                      <Link to='/playlist-by-track'>By Song</Link>
                  </li>
                  <li>
                      <Link to='/playlist-by-artist'>By Artist</Link>
                  </li>
              </ul>
          </nav>
          <ConnectButton />
          <LogoutButton />
          <p>Jammming is a Playlist Creator that uses the Spotify Web API to allow you to easily generate playlists of your favorite music and explore new songs based on your listening history.</p>
        </header>
        <Switch>
            <Route path='/playlist-creator'>
                <PlaylistCreator />
            </Route>
            <Route path='/playlist-by-track'>
                <SimilarTracksPlaylist />
            </Route>
            <Route path='/playlist-by-artist'>
                <SimilarArtistsPlaylist />
            </Route>
            <Route path='/start'>
                <Start />
            </Route>
            <Route path='/'>
                <PlaylistCreator />
            </Route>
        </Switch>
        <footer>App built using Spotify Web API, inspired by Codecademy front-end web development project submission. By Melanie Bucher, 2021.</footer>
      </div>  
    </Router>
  );
}


export default App;
