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
import About from './components/NavBar/About';
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
          <div>
              <Link to='/about'>About</Link>
          </div>
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
            <Route path='/about'>
                <About />
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
