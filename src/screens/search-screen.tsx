import * as React from 'react';
import { SearchResult } from 'types';
import youtube from 'api/youtube';
import styled from '@emotion/styled';
import SearchResults from 'components/search-results';

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

      <SearchResults results={searchResults} />

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
