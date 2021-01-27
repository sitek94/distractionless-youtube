import * as React from 'react';
import styled from '@emotion/styled';

import { Routes, Route, Link } from 'react-router-dom';
import { Container } from '@material-ui/core';

import SearchScreen from 'screens/search';
import PlayerScreen from 'screens/player';
import HomeScreen from 'screens/home';

import AppBar from 'components/app-bar';

function App() {
  return (
    <>
      <AppBar />
      <Container>
        <h1>
          Distraction<span style={{ color: 'cornflowerblue' }}>LESS</span>{' '}
          YouTube
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
      </Container>
    </>
  );
}

const Nav = styled.nav({
  '& > *:not(:last-child)': {
    marginRight: 10,
  },
});

export default App;
