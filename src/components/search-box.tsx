import * as React from 'react';

interface Props {
  onTermSubmit: (term: string) => void;
}

function SearchScreen({ onTermSubmit }: Props) {
  const [input, setInput] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onTermSubmit(input);
  };

  return (
    <div id="search-box">
      <h2>Search for a video</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}

export default SearchScreen;
