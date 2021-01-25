import * as React from 'react';
import axios from 'axios';

function App() {
  const [term, setTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

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
      <div id="search-input">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.currentTarget.value)}
        />
      </div>
      <pre>{JSON.stringify(searchResults, null, 2)}</pre>
    </div>
  );
}

export default App;
