import * as React from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

interface SearchResult {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
}

function App() {
  return (
    <Router>
      <div>
        <h1>
          Distraction<span style={{ color: 'cornflowerblue' }}>LESS</span>{' '}
          YouTube
        </h1>

        <Nav>
          <Link to="/">Home</Link>
          <Link to="search">Search</Link>
        </Nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
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

function Search() {
  const [term, setTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);

  React.useEffect(() => {
    axios
      .get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          q: term,
          part: 'snippet',
          maxResult: 5,
          type: 'video',
          key: process.env.REACT_APP_YOUTUBE_KEY,
        },
      })
      .then((response) => {
        setSearchResults(response.data.items);
      });
  }, [term]);

  return (
    <div>
      <div id="search-input">
        <h2>Search for a video</h2>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.currentTarget.value)}
        />
      </div>

      <div id="search-results">
        <h2>Search results</h2>
        <List>
          {searchResults.map(({ id, snippet }) => {
            const { title, description, thumbnails } = snippet;
            const { width, height, url } = thumbnails.default;
            return (
              <Li key={id.videoId}>
                <img alt={title} width={width} height={height} src={url} />
                <div>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </div>
              </Li>
            );
          })}
        </List>
      </div>

      <div>
        <h2>API Response</h2>
        <pre>{JSON.stringify(searchResults, null, 2)}</pre>
      </div>
    </div>
  );
}

const Nav = styled.nav({
  '& > *:not(:last-child)': {
    marginRight: 10,
  },
});
const List = styled.ul({
  listStyle: 'none',
  padding: 0,
});
const Li = styled.li({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
});

export default App;
