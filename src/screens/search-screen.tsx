import * as React from 'react';
import { SearchResult } from 'types';
import youtube from 'api/youtube';
import SearchResults from 'components/search-results';
import SearchBox from 'components/search-box';

function SearchScreen() {
  const [term, setTerm] = React.useState('');
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

  return (
    <div>
      <SearchBox onTermSubmit={setTerm} />

      <SearchResults results={searchResults} />

      <div>
        <h2>API Response</h2>
        <pre>{JSON.stringify(searchResults, null, 2)}</pre>
      </div>
    </div>
  );
}

export default SearchScreen;
