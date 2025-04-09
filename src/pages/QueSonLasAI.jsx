import { Container, Typography, Box, Link, Card, CardContent, CardActions, Button, Divider, Grid } from '@mui/material';

function QueSonLasAI() {
  const iaImageExamples = [
    {
      name: 'DALL-E 2 (OpenAI)',
      description: 'Crea imágenes realistas y artísticas a partir de texto. Varias versiones, algunas gratuitas con limitaciones y otras de pago.',
      link: 'https://openai.com/dall-e-2/',
    },
    {
      name: 'Midjourney',
      description: 'Conocida por su estilo artístico y creativo. Se accede a través de Discord. Principalmente de pago con algunas pruebas gratuitas.',
      link: 'https://www.midjourney.com/',
    },
    {
      name: 'Stable Diffusion',
      description: 'Modelo de código abierto, con varias interfaces y opciones. Algunas versiones y plataformas son gratuitas, otras de pago.',
      link: 'https://stablediffusion.com/',
    },
  ];

  const iaTextExamples = [
    {
      name: 'ChatGPT (OpenAI)',
      description: 'Modelo conversacional potente para generar diversos tipos de texto. Versiones gratuitas (GPT-3.5) y de pago (GPT-4 con más capacidades).',
      link: 'https://openai.com/chatgpt/',
    },
    {
      name: 'Bard (Google, Génesis)',
      description: 'Modelo conversacional de Google, integrado con su ecosistema. Actualmente gratuito.',
      link: 'https://bard.google.com/',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        ¿Qué son las Inteligencias Artificiales (IA) Generativas?
      </Typography>

      <Typography variant="body1" paragraph>
        Las Inteligencias Artificiales (IA) generativas son modelos de aprendizaje automático capaces de crear contenido nuevo y original que se asemeja a los datos con los que fueron entrenados. Esto incluye texto, imágenes, audio, video e incluso código. En lugar de simplemente analizar o clasificar información existente, estas IA aprenden los patrones y la estructura de los datos para generar algo nuevo.
      </Typography>

      <Typography variant="h5" gutterBottom>
        ¿Para qué sirven las IA Generativas?
      </Typography>
      <Typography variant="body1" paragraph>
        Las aplicaciones de las IA generativas son vastas y están en constante expansión. Algunos ejemplos incluyen:
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2, my: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>Creación de Imágenes</Typography>
            <Typography variant="body2" color="textSecondary">Generar imágenes realistas, artísticas o fantásticas a partir de descripciones textuales.</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>Generación de Texto</Typography>
            <Typography variant="body2" color="textSecondary">Escribir artículos, poemas, guiones, correos electrónicos, código y mucho más.</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>Síntesis de Audio</Typography>
            <Typography variant="body2" color="textSecondary">Crear voces artificiales, música y efectos de sonido.</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>Generación de Video</Typography>
            <Typography variant="body2" color="textSecondary">Producir videos cortos o animaciones a partir de texto o imágenes.</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>Diseño y Modelado 3D</Typography>
            <Typography variant="body2" color="textSecondary">Crear modelos tridimensionales para diversas aplicaciones.</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>Descubrimiento de Fármacos</Typography>
            <Typography variant="body2" color="textSecondary">Generar nuevas moléculas con propiedades deseadas.</Typography>
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Ejemplos de IA Generativas y sus Características
      </Typography>

      <Typography variant="h6" gutterBottom>
        IA para Generación de Imágenes
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {iaImageExamples.map((ia) => (
          <Grid item xs={12} sm={6} key={ia.name}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>{ia.name}</Typography>
                <Typography variant="body2" color="textSecondary">{ia.description}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <Button size="small" color="primary" href={ia.link} target="_blank" rel="noopener noreferrer">
                  Visitar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        IA para Generación de Texto
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {iaTextExamples.map((ia) => (
          <Grid item xs={12} sm={6} key={ia.name}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>{ia.name}</Typography>
                <Typography variant="body2" color="textSecondary">{ia.description}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <Button size="small" color="primary" href={ia.link} target="_blank" rel="noopener noreferrer">
                  Visitar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Gratuitas vs. Pagas y sus Diferentes Versiones
      </Typography>
      <Typography variant="body1" paragraph>
        Muchas IA generativas ofrecen tanto planes gratuitos con limitaciones (por ejemplo, número de generaciones, velocidad, acceso a funciones avanzadas) como planes de pago con más capacidades y menos restricciones. Además, los modelos base de algunas IA evolucionan con el tiempo, dando lugar a diferentes versiones (por ejemplo, GPT-3, GPT-3.5, GPT-4). Las versiones más recientes suelen ofrecer mejor calidad y nuevas funcionalidades, pero a menudo están disponibles solo en los planes de pago.
      </Typography>
      <Typography variant="body1" paragraph>
        Al explorar estas herramientas, te recomendamos revisar cuidadosamente los planes y las características de cada versión para encontrar la que mejor se adapte a tus necesidades y presupuesto.
      </Typography>

      <Divider sx={{ my: 3 }} />



      <Box mt={4} textAlign="center">
        <Typography variant="caption" color="textSecondary">
          Información actualizada a 09 de abril del 2025 - La disponibilidad y los precios pueden variar.
        </Typography>
      </Box>
    </Container>
  );
}

export default QueSonLasAI;