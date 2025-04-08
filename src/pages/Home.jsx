import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>Bienvenido/a al Generador de Prompts 🤖</Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Esta app te ayuda a crear prompts personalizados para generar <strong>imágenes</strong>, <strong>textos</strong> o <strong>código</strong>.
        Solo tenés que seleccionar el tipo de contenido, escribir un tema y elegir un estilo. Nosotros te damos el prompt perfecto listo para usar.
      </Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Elegí qué tipo de prompt querés generar:
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" component={Link} to="/imagen">🎨 Imagen</Button>
        <Button variant="contained" component={Link} to="/texto">📝 Texto</Button>
        <Button variant="contained" component={Link} to="/codigo">💻 Código</Button>
      </Box>
    </Container>
  );
}
