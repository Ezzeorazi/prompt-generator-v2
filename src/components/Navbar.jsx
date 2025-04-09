import { useState, useEffect } from 'react';
import {
    AppBar, Toolbar, Typography, IconButton, Drawer,
    List, ListItem, ListItemButton, ListItemText, Box, useMediaQuery, useTheme, Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ImageIcon from '@mui/icons-material/Image';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CodeIcon from '@mui/icons-material/Code';
import InfoIcon from '@mui/icons-material/Info';
import VideocamIcon from '@mui/icons-material/Videocam'; // Importa el icono de video
import { Link } from 'react-router-dom';

const sections = [
    { label: 'Imagen', path: '/imagen', icon: <ImageIcon sx={{ mr: 1 }} /> },
    { label: 'Texto', path: '/texto', icon: <TextFieldsIcon sx={{ mr: 1 }} /> },
    { label: 'Código', path: '/codigo', icon: <CodeIcon sx={{ mr: 1 }} /> },
    { label: 'Video', path: '/video', icon: <VideocamIcon sx={{ mr: 1 }} /> }, // Nueva sección
    { label: '¿Qué son las IA?', path: '/que-son-las-ai', icon: <InfoIcon sx={{ mr: 1 }} /> },
    // Podés agregar más rutas acá
];

function Navbar() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleDrawer = (state) => () => {
        setOpen(state);
    };

    return (
        <>
            <AppBar position={isMobile ? "fixed" : "static"}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
                        Prompt Generator
                    </Typography>

                    {isMobile ? (
                        <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {sections.map(({ label, path, icon }) => (
                                <Button
                                    key={path}
                                    component={Link}
                                    to={path}
                                    color="inherit"
                                    startIcon={icon}
                                    sx={{
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: theme.shape.borderRadius,
                                        '&:hover': {
                                            backgroundColor: theme.palette.action.hover,
                                        },
                                    }}
                                >
                                    {label}
                                </Button>
                            ))}
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                    <List>
                        {sections.map(({ label, path, icon }) => (
                            <ListItem key={path} disablePadding>
                                <ListItemButton component={Link} to={path}>
                                    {icon}
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