import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Imagen from './pages/Imagen';
import Texto from './pages/Texto';
import Codigo from './pages/Codigo';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import TerminosCondiciones from './pages/TerminosCondiciones';
import QueSonLasAI from './pages/QueSonLasAI'; // Importa el nuevo componente
import Video from './pages/Video';
import Diseno3D from './pages/Diseno3D';
import MarketingDigital from './pages/MarketingDigital';

export default function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />

      {/* Contenedor del contenido principal con padding superior en móvil */}
      <Box sx={{ flex: 1, paddingTop: isMobile ? '64px' : '0' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/imagen" element={<Imagen />} />
          <Route path="/texto" element={<Texto />} />
          <Route path="/codigo" element={<Codigo />} />
          <Route path="/marketing-digital" element={<MarketingDigital />} />
          <Route path="/terminos-y-condiciones" element={<TerminosCondiciones />} />
          <Route path="/que-son-las-ai" element={<QueSonLasAI />} /> 
          <Route path="/video" element={<Video />} /> 
          <Route path="/diseno-3d" element={<Diseno3D />} /> 

        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}