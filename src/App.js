import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import './App.css';
import PlaylistCreator from './components/PlaylistCreator/PlaylistCreator';
import SimilarTracksPlaylist from './components/SimilarTracksPlaylist/SimilarTracksPlaylist';
import SimilarArtistsPlaylist from './components/SimilarArtistsPlaylist/SimilarArtistsPlaylist';
import ConnectButton from './components/NavBar/ConnectButton';
import LogoutButton from './components/NavBar/LogoutButton';
import Start from './components/NavBar/Start';
import About from './components/NavBar/About';

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
                      <NavLink to='/playlist-creator' activeClassName='selected'>By Search</NavLink>
                  </li>
                  <li>
                      <NavLink to='/playlist-by-track' activeClassName='selected'>By Song</NavLink>
                  </li>
                  <li>
                      <NavLink to='/playlist-by-artist' activeClassName='selected'>By Artist</NavLink>
                  </li>
                  <li>
                    <NavLink to='/about' activeClassName='selected'>About</NavLink>
                  </li>
              </ul>
          </nav>
          <ConnectButton />
          <LogoutButton />
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
        <footer>React-Redux app built using the Spotify Web API by Melanie Bucher (2021).</footer>
      </div>  
    </Router>
  );
}


export default App;
