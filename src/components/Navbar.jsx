import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Drawer,
  List, ListItem, ListItemButton, ListItemText, Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const sections = [
  { label: 'Inicio', path: '/' },
  { label: 'Prompts de Imagen', path: '/imagen' },
  { label: 'Prompts de Texto', path: '/texto' },
  { label: 'Prompts de Código', path: '/codigo' },
  // Podés agregar más rutas acá
];

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            Prompt Generator
          </Typography>

          <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {sections.map(({ label, path }) => (
              <ListItem key={path} disablePadding>
                <ListItemButton component={Link} to={path}>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;

