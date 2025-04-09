import { useState } from 'react';
import {
  Container, Typography, Box, TextField,
  Select, MenuItem, Button, FormControl,
  Snackbar, Alert, Paper, FormHelperText
} from '@mui/material';

const estilosImagen = [
  'realista', 'grunge', 'sketch', 'pixel art', '3D', 'caricatura', 'estilo ghibli',
  'acuarela', 'cómic', 'anime', 'surrealista', 'cyberpunk', 'steampunk',
  'pop art', 'doodle', 'low poly', 'noir', 'arte abstracto', 'fantasía épica',
];

const relacionesAspecto = ['1:1', '16:9', '9:16', '4:3'];
const calidadesImagen = ['baja', 'media', 'alta', 'detallada'];
const iluminaciones = ['luz natural', 'luz de estudio', 'neón', 'atmosférica', 'dramática'];

export default function Imagen() {
  const [tema, setTema] = useState('');
  const [estilo, setEstilo] = useState('');
  const [aspecto, setAspecto] = useState('');
  const [calidad, setCalidad] = useState('');
  const [iluminacion, setIluminacion] = useState('');
  const [prompt, setPrompt] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [temaError, setTemaError] = useState(false);

  const generarPrompt = () => {
    if (!tema.trim()) {
      setTemaError(true);
      return;
    }
    setTemaError(false); // Limpia el error si hay texto
    let p = `Generá una imagen`;
    if (estilo) p += ` en estilo ${estilo}`;
    if (aspecto) p += ` con relación de aspecto ${aspecto}`;
    if (calidad) p += ` con calidad ${calidad}`;
    if (iluminacion) p += ` con iluminación ${iluminacion}`;
    p += ` que represente: "${tema}"`;
    setPrompt(p);
  };

  const copiar = () => {
    navigator.clipboard.writeText(prompt);
    setCopiado(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>🎨 Prompt de Imagen</Typography>

      <Typography variant="body2" color="textSecondary" mb={1}>
        Ingresa un tema y personaliza la imagen con las siguientes opciones:
      </Typography>
      <ul>
        <li>
          <strong>Estilo:</strong> Define la apariencia artística general.
        </li>
        <li>
          <strong>Relación de Aspecto:</strong> Cambia las proporciones de la imagen.
        </li>
        <li>
          <strong>Calidad/Detalle:</strong> Ajusta el nivel de detalle visual.
        </li>
        <li>
          <strong>Iluminación:</strong> Controla la luz y la atmósfera de la escena.
        </li>
      </ul>
      <Typography variant="body2" color="textSecondary" mb={2} mt={1}>
        Para una prueba rápida o ideas de inspiración, simplemente escribe un tema y haz clic en "Generar".
      </Typography>

      <TextField
        fullWidth
        label="Tema principal"
        margin="normal"
        value={tema}
        onChange={(e) => {
          setTema(e.target.value);
          setTemaError(false); // Limpia el error al escribir
        }}
        required
        error={temaError}
        helperText={temaError && 'Por favor, ingresa un tema principal.'}
      />

      {/* ... (Los componentes Box y FormControl para los Select) ... */}
      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Estilo
        </Typography>
        <FormControl fullWidth>
          <Select value={estilo} onChange={(e) => setEstilo(e.target.value)}>
            <MenuItem value="">-- Cualquiera --</MenuItem>
            {estilosImagen.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Relación de Aspecto
        </Typography>
        <FormControl fullWidth>
          <Select value={aspecto} onChange={(e) => setAspecto(e.target.value)}>
            <MenuItem value="">-- Predeterminado --</MenuItem>
            {relacionesAspecto.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Calidad/Detalle
        </Typography>
        <FormControl fullWidth>
          <Select value={calidad} onChange={(e) => setCalidad(e.target.value)}>
            <MenuItem value="">-- Predeterminado --</MenuItem>
            {calidadesImagen.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Iluminación
        </Typography>
        <FormControl fullWidth>
          <Select value={iluminacion} onChange={(e) => setIluminacion(e.target.value)}>
            <MenuItem value="">-- Predeterminado --</MenuItem>
            {iluminaciones.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={generarPrompt}>
        Generar
      </Button>

      {prompt && (
        <Box mt={4}>
          <Paper sx={{ backgroundColor: '#f0f0f0', p: 2, mb: 1 }}>
            <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#555' }}>
              {prompt}
            </Typography>
          </Paper>
          <Button variant="outlined" onClick={copiar}>📋 Copiar</Button>
          <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic', mt: 2 }}>
            Copia el prompt de arriba y pégalo en tu IA de generación de imágenes preferida (por ejemplo, Gemini, DALL-E, Midjourney, Stable Diffusion, Chat GPT etc.).
          </Typography>
        </Box>
      )}

      <Snackbar
        open={copiado}
        autoHideDuration={2000}
        onClose={() => setCopiado(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setCopiado(false)} severity="success" sx={{ width: '100%' }}>
          Prompt copiado al portapapeles ✅
        </Alert>
      </Snackbar>
    </Container>
  );
}