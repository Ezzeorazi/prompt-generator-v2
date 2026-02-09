import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import BlenderIcon from '@mui/icons-material/Blender'; // Importa el icono aquí también

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>Bienvenido/a al Generador de Prompts 🤖</Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Los prompts son las instrucciones o preguntas que le das a un modelo de inteligencia artificial (IA)
        para obtener una respuesta específica. Piensa en ellos como la llave que desbloquea el potencial creativo y funcional de la IA.
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Esta app te ayuda a crear prompts personalizados para generar <strong>imágenes</strong>, <strong>textos</strong>, <strong>código</strong>, <strong>videos</strong>, <strong>modelos 3D</strong> y <strong>estrategias de marketing digital</strong>.
        Solo tenés que seleccionar el tipo de contenido, escribir un tema y elegir un estilo. Nosotros te damos el prompt perfecto listo para usar.
      </Typography>


      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Elegí qué tipo de prompt querés generar:
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" component={Link} to="/imagen">🎨 Imagen</Button>
        <Button variant="contained" component={Link} to="/texto">📝 Texto</Button>
        <Button variant="contained" component={Link} to="/codigo">💻 Código</Button>
        <Button variant="contained" component={Link} to="/video">🎬 Video</Button>
        <Button variant="contained" component={Link} to="/diseno-3d" startIcon={<BlenderIcon />} >📐 Diseño 3D</Button>
        <Button variant="contained" component={Link} to="/marketing-digital">📱 Marketing Digital</Button>
      </Box>
    </Container>
  );
}