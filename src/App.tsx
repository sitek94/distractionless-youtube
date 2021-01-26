import * as React from 'react';
import styled from '@emotion/styled';

import { Routes, Route, Link } from 'react-router-dom';

import SearchScreen from 'screens/search-screen';
import PlayerScreen from 'screens/player-screen';
import HomeScreen from 'screens/home-screen';

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
        <Route path="/" element={<HomeScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="watch/:videoId" element={<PlayerScreen />} />
      </Routes>
    </div>
  );
}

const Nav = styled.nav({
  '& > *:not(:last-child)': {
    marginRight: 10,
  },
});

export default App;
