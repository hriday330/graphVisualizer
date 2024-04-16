import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import NavLink from React Router
import {
  AppBar, Toolbar, IconButton, Typography,
  Button, Drawer, List, ListItemText, ListItemIcon, ListItemButton,
  useMediaQuery, useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const appBarStyles = {
  backgroundColor: '#374151',
};

const logoStyles = {
  color: '#fff',
};

const listItemTextStyles = {
  color: '#fff',
};

const drawerPaperStyles = {
  backgroundColor: '#374151',
};

function Navbar() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="sticky" sx={appBarStyles}>
        <Toolbar className="justify-between">
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={logoStyles}>
            GraphAlive
          </Typography>
          {!isMobile && (
            <div className="hidden md:flex">
              <Button color="inherit">
                <Link to="/"> Home </Link>
              </Button>
              <Button color="inherit">
                <Link to="/about"> About</Link>
              </Button>
              <Button color="inherit">
                <Link to="/login"> Login </Link>
              </Button>

            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        sx={{ '& .MuiDrawer-paper': drawerPaperStyles }}
      >
        <div className="p-4">
          <List>
            <ListItemButton onClick={handleDrawerClose}>
              <ListItemIcon />
              <ListItemText primary="Home" sx={listItemTextStyles}>
                <Link to="/" />
              </ListItemText>
            </ListItemButton>
            <ListItemButton onClick={handleDrawerClose}>
              <ListItemIcon />
              <ListItemText primary="About" sx={listItemTextStyles}>
                <Link to="/about" />
              </ListItemText>
            </ListItemButton>
            <ListItemButton onClick={handleDrawerClose}>
              <ListItemIcon />
              <ListItemText primary="Login" sx={listItemTextStyles}>
                <Link to="/" />
              </ListItemText>
            </ListItemButton>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default Navbar;
