import * as React from 'react';
import { Link } from 'react-router-dom';
import { SearchResult } from 'types';
import youtube from 'api/youtube';
import styled from '@emotion/styled';

function SearchScreen() {
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

const List = styled.ul({
  listStyle: 'none',
  padding: 0,
});
const Li = styled.li({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
});

export default SearchScreen;
