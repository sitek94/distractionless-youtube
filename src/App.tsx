import * as React from 'react';
import youtube from 'api/youtube';
import styled from '@emotion/styled';

import { Routes, Route, Link, useParams } from 'react-router-dom';

import SearchScreen from 'screens/search-screen';
import PlayerScreen from 'screens/player-screen';

function App() {
  return (
    <div>
      <h1>
        Distraction<span style={{ color: 'cornflowerblue' }}>LESS</span> YouTube
      </h1>

      <Nav>
        <Link to="/">Home</Link>
        <Link to="search">Search</Link>
      </Nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="watch/:videoId" element={<PlayerScreen />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Homepage</h2>
      <hr />
      <a
        href="https://github.com/sitek94/distractionless-youtube"
        rel="noreferrer noopener"
        target="_blank"
      >
        Checkout the project on GitHub
      </a>
    </div>
  );
}

const Nav = styled.nav({
  '& > *:not(:last-child)': {
    marginRight: 10,
  },
});

export default App;
