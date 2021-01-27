import * as React from 'react';
import InputBase from '@material-ui/core/InputBase';
import { alpha, Box, useTheme } from '@material-ui/core';

interface Props {
  onTermSubmit: (term: string) => void;
}

function SearchBox({ onTermSubmit }: Props) {
  const theme = useTheme();

  const [input, setInput] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onTermSubmit(input);
  };

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      sx={{
        width: '100%',
        borderRadius: 1,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
      }}
    >
      <InputBase
        placeholder="Search…"
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        inputProps={{ 'aria-label': 'search' }}
        sx={{
          color: 'inherit',
          width: '100%',
          '& input': {
            ml: 1,
            p: 1,
          },
        }}
      />
    </Box>
  );
}

export default SearchBox;
