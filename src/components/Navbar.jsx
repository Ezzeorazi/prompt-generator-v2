import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Drawer,
  List, ListItem, ListItemButton, ListItemText, Box, useMediaQuery, useTheme, Button
} from '@mui/material';
import { Menu, Image as ImageIcon, Type, Code, Video, Box as BoxIcon, Megaphone, Music, Info, Terminal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SECCIONES = [
  { label: 'Imagen', path: '/imagen', icon: <ImageIcon size={18} /> },
  { label: 'Texto', path: '/texto', icon: <Type size={18} /> },
  { label: 'Código', path: '/codigo', icon: <Code size={18} /> },
  { label: 'Video', path: '/video', icon: <Video size={18} /> },
  { label: 'Marketing', path: '/marketing-digital', icon: <Megaphone size={18} /> },
  { label: 'Música', path: '/musica', icon: <Music size={18} /> },
  { label: '3D', path: '/diseno-3d', icon: <BoxIcon size={18} /> },
  { label: 'Docs (IA)', path: '/que-son-las-ai', icon: <Info size={18} /> },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const toggleDrawer = (state) => () => setOpen(state);

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: '#0f172a', borderBottom: '1px solid #1e293b', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: '70px' }}>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ textDecoration: 'none', color: '#f8fafc', fontWeight: 'bold', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Terminal color="#38bdf8" size={24} /> prompt_gen
          </Typography>

          {isMobile ? (
            <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
              <Menu color="#f8fafc" />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {SECCIONES.map(({ label, path, icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Button
                    key={path}
                    component={Link}
                    to={path}
                    startIcon={icon}
                    sx={{
                      color: isActive ? '#38bdf8' : '#94a3b8',
                      textTransform: 'none',
                      fontWeight: isActive ? 'bold' : 'normal',
                      bgcolor: isActive ? '#0284c715' : 'transparent',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      '&:hover': { bgcolor: '#1e293b', color: '#f8fafc' },
                    }}
                  >
                    {label}
                  </Button>
                );
              })}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Menú Móvil Oscuro */}
      <Drawer 
        anchor="right" 
        open={open} 
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { bgcolor: '#0f172a', borderLeft: '1px solid #1e293b', width: 280 } }}
      >
        <Box role="presentation" onClick={toggleDrawer(false)} sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 2, px: 2, fontFamily: 'monospace' }}>// MÓDULOS</Typography>
          <List>
            {SECCIONES.map(({ label, path, icon }) => (
              <ListItem key={path} disablePadding sx={{ mb: 1 }}>
                <ListItemButton 
                  component={Link} 
                  to={path}
                  sx={{ 
                    borderRadius: 2, 
                    color: location.pathname === path ? '#38bdf8' : '#cbd5e1',
                    bgcolor: location.pathname === path ? '#0284c715' : 'transparent',
                    '&:hover': { bgcolor: '#1e293b' }
                  }}
                >
                  <Box sx={{ mr: 2, display: 'flex' }}>{icon}</Box>
                  <ListItemText primary={label} primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: location.pathname === path ? 'bold' : 'normal' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}