import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

// Componentes de Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Páginas
import Home from './pages/Home';
import Imagen from './pages/Imagen';
import Texto from './pages/Texto';
import Codigo from './pages/Codigo';
import Video from './pages/Video';
import Diseno3D from './pages/Diseno3D';
import MarketingDigital from './pages/MarketingDigital';
import QueSonLasAI from './pages/QueSonLasAI';
import TerminosCondiciones from './pages/TerminosCondiciones';

export default function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: '#020617', // Asegura el fondo oscuro de la terminal en toda la app
        color: '#f8fafc',   // Asegura el texto claro por defecto
      }}
    >
      <Navbar />

      {/* Contenedor del contenido principal. 
        'flexGrow: 1' empuja el Footer siempre hacia abajo aunque haya poco contenido.
      */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/imagen" element={<Imagen />} />
          <Route path="/texto" element={<Texto />} />
          <Route path="/codigo" element={<Codigo />} />
          <Route path="/video" element={<Video />} />
          <Route path="/diseno-3d" element={<Diseno3D />} />
          <Route path="/marketing-digital" element={<MarketingDigital />} />
          <Route path="/que-son-las-ai" element={<QueSonLasAI />} /> 
          <Route path="/terminos-y-condiciones" element={<TerminosCondiciones />} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}