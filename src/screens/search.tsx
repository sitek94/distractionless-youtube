import * as React from 'react';
import youtube from 'api/youtube';
import SearchResultList from 'components/search-result-list';
import SearchBox from 'components/search-box';

function SearchScreen() {
  const [term, setTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<YT.SearchResult[]>([]);

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

      <SearchResultList results={searchResults} />

      <div>
        <h2>API Response</h2>
        <pre>{JSON.stringify(searchResults, null, 2)}</pre>
      </div>
    </div>
  );
}

export default SearchScreen;
