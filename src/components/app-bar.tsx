import * as React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Box } from '@material-ui/core';

interface AppBarProps {
  children?: React.ReactNode;
}

function AppBar({ children }: AppBarProps) {
  return (
    <MuiAppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Start */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 185,
          }}
        >
          <MenuButton />
          <AppLogo />
        </Box>

        {/* Center */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {children}
        </Box>

        {/* End */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: 185,
          }}
        >
          Buttons placeholder
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}

function MenuButton() {
  return (
    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      <MenuIcon />
    </IconButton>
  );
}

function AppLogo() {
  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      YouTube
    </Typography>
  );
}

export default AppBar;
