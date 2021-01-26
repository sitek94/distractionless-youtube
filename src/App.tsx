import * as React from 'react';
import youtube from 'api/youtube';
import styled from '@emotion/styled';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

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
          {/* <Route path="watch/:videoId" element={<Player />} /> */}
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
  const [input, setInput] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);

  React.useEffect(() => {
    function searchTerm() {
      youtube
        .get('/search', {
          params: {
            q: term,
            part: 'snippet',
            maxResult: 5,
            type: 'video',
          },
        })
        .then((response) => {
          setSearchResults(response.data.items);
        });
    }

    if (term !== '') {
      searchTerm();
    }
  }, [term]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTerm(input);
  };

  return (
    <div>
      <div id="search-input">
        <h2>Search for a video</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </form>
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
                  <Link to={`/watch/${id.videoId}`}>
                    <h4>{title}</h4>
                  </Link>
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
