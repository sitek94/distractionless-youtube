import * as React from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

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
        console.log(response);
        setSearchResults(response.data.items);
      });
  }, [term]);

  return (
    <div className="App">
      <h1>
        Distraction<span style={{ color: 'cornflowerblue' }}>LESS</span> YouTube
      </h1>

      <div id="search-input">
        <h2>Search for a video</h2>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.currentTarget.value)}
        />
      </div>

      <div id="player">
        <h3>Video Title</h3>
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
