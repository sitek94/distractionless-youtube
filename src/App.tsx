import * as React from 'react';
import youtube from 'api/youtube';
import styled from '@emotion/styled';

import { Routes, Route, Link, useParams } from 'react-router-dom';

import SearchScreen from 'screens/search-screen';

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
        {/* <Route path="watch/:videoId" element={<Player />} /> */}
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

function Player() {
  const { videoId } = useParams();
  const [video, setVideo] = React.useState({});
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    youtube
      .get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet',
          id: videoId,
          key: process.env.REACT_APP_YOUTUBE_KEY,
        },
      })
      .then((response) => {
        console.log(response);
        setVideo(response.data.items[0]);
      });
  }, [videoId]);

  React.useEffect(() => {
    youtube
      .get('https://www.googleapis.com/youtube/v3/commentThreads', {
        params: {
          part: 'snippet',
          videoId: videoId,
          key: process.env.REACT_APP_YOUTUBE_KEY,
          maxResults: 5,
        },
      })
      .then((response) => {
        console.log(response);
        setComments(response.data.items);
      });
  }, [videoId]);

  return (
    <div id="search-input">
      <h2>Search for a video</h2>
      <div>
        <iframe
          title="Video Title"
          src={`https://www.youtube.com/embed/${videoId}`}
        />
      </div>
      <div>
        <h2>API Response</h2>
        <pre>{JSON.stringify(video, null, 2)}</pre>
      </div>
      <div>
        <h2>Comments</h2>
        <pre>{JSON.stringify(comments, null, 2)}</pre>
      </div>
    </div>
  );
}

const Nav = styled.nav({
  '& > *:not(:last-child)': {
    marginRight: 10,
  },
});

export default App;
