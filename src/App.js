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

function App() {
  return (  
    <Router>
      <div className='app'>
        <header className='navbar'>
          <p>
              <Link to='/'>Jammming</Link>
          </p>
          <nav className='navigation'>
              <ul>
                  <li>
                      <Link to='/playlist-creator'>Playlist creator</Link>
                  </li>
                  <li><a>Magic Playlist</a>
                      <ul className='dropdown'>
                          <li>
                              <Link to='/magic-playlist-tracks'>For Tracks</Link>
                          </li>
                          <li>
                              <Link to='/magic-playlist-artists'>For Artists</Link>
                          </li>
                      </ul>    
                  </li>
                  <li>
                    <ConnectButton />
                  </li>
              </ul>
          </nav>
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
