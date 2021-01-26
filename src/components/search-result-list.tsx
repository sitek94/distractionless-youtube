import * as React from 'react';
import { Link } from 'react-router-dom';
import { SearchResults } from 'types';
import styled from '@emotion/styled';

interface Props {
  results: SearchResults;
}

function SearchResultList({ results }: Props) {
  return (
    <div id="search-results">
      <h2>Search results</h2>
      <List>
        {results.map(({ id, snippet }) => {
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

export default SearchResultList;
