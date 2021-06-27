import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import './components/NavBar/NavBar.css';


function App() {
  return (  
    <Router>
      <div className='App'>
        <div className='navbar'>
          <p>
              <Link to='/'>Jammming</Link>
          </p>
          <nav className='navigation'>
              <ul>
                  <li>
                      <Link to='/1click'>1click playlist</Link>
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
                  <li><button>Connect to your Spotify Account</button></li>
              </ul>
          </nav>
          
          <Switch>
              <Route path='/1click'>
                  <Users />
              </Route>
              <Route path='/magic-playlist-tracks'>
                  <Home />
              </Route>
              <Route path='/magic-playlist-artists'>
                  
              </Route>
              <Route path='/'>
                  <About />
              </Route>
          </Switch>
          
        </div>
      </div>  
    </Router>
  );
}

function Home() {
  return (
      <div>
          <h2>Home</h2>
      </div>
  )
  ;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
