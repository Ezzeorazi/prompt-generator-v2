import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, Type, Code, Video, Cuboid, Megaphone, Music, Terminal } from 'lucide-react';

const HERRAMIENTAS = [
  { titulo: 'Generador de Imágenes', ruta: '/imagen', icono: <ImageIcon size={32} color="#10b981" />, desc: 'Prompts visuales para Midjourney, DALL-E y más.', color: '#10b981' },
  { titulo: 'Asistente de Texto', ruta: '/texto', icono: <Type size={32} color="#f59e0b" />, desc: 'Copys SEO, correos y respuestas inteligentes.', color: '#f59e0b' },
  { titulo: 'Código & Refactor', ruta: '/codigo', icono: <Code size={32} color="#34d399" />, desc: 'Optimizá o crea componentes de software.', color: '#34d399' },
  { titulo: 'Producción de Video', ruta: '/video', icono: <Video size={32} color="#f43f5e" />, desc: 'Guiones y cinemáticas para IAs de video.', color: '#f43f5e' },
  { titulo: 'Diseño & Render 3D', ruta: '/diseno-3d', icono: <Cuboid size={32} color="#a855f7" />, desc: 'Materiales, luces y geometría 3D.', color: '#a855f7' },
  { titulo: 'Marketing Digital', ruta: '/marketing-digital', icono: <Megaphone size={32} color="#38bdf8" />, desc: 'Calendarios, posts y estrategias de Ads.', color: '#38bdf8' },
  { titulo: 'Música con IA', ruta: '/musica', icono: <Music size={32} color="#f97316" />, desc: 'Prompts para Suno: canciones, bases e inspiración musical.', color: '#f97316' },
];

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#f8fafc', 
            mb: 3, 
            fontFamily: 'monospace', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 2,
            fontSize: { xs: '1.8rem', md: '3rem' } // Achicamos un poco el título en celu
          }}
        >
          <Terminal color="#38bdf8" size={32} /> Prompt_Gen
        </Typography>
        <Typography variant="h6" sx={{ color: '#94a3b8', maxWidth: '800px', mx: 'auto', fontWeight: 'normal', lineHeight: 1.6, fontSize: { xs: '1rem', md: '1.25rem' } }}>
          La llave para desbloquear el verdadero potencial de la Inteligencia Artificial. Seleccioná una herramienta, completá los parámetros y obtené el prompt perfecto.
        </Typography>
      </Box>

      {/* Redujimos el spacing de 4 a 3 para evitar desbordes bruscos */}
      <Grid container spacing={3}>
        {HERRAMIENTAS.map((herramienta) => (
          // El display: 'flex' acá es la magia que evita que se encimen
          <Grid item xs={12} sm={6} md={4} key={herramienta.ruta} sx={{ display: 'flex' }}>
            <Paper 
              component={Link} 
              to={herramienta.ruta}
              sx={{ 
                p: 4, 
                width: '100%', // Cambiamos height: 100% por width: 100%
                bgcolor: '#0f172a', 
                border: '1px solid #1e293b', 
                borderRadius: 3,
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  borderColor: herramienta.color,
                  boxShadow: `0 10px 30px -10px ${herramienta.color}40`
                }
              }}
            >
              <Box sx={{ p: 2, bgcolor: `${herramienta.color}15`, borderRadius: '50%', mb: 3 }}>
                {herramienta.icono}
              </Box>
              <Typography variant="h6" sx={{ color: '#f8fafc', fontWeight: 'bold', mb: 1 }}>
                {herramienta.titulo}
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                {herramienta.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}