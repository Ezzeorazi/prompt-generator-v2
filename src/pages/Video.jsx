import { useState } from 'react';
import {
  Container, Typography, Box, TextField,
  Select, MenuItem, Button, FormControl,
  Snackbar, Alert, Paper, InputLabel
} from '@mui/material';

const estilosVideo = ['cinemático', 'animación 3D', 'dibujos animados', 'stop-motion', 'documental', 'surrealista', 'videojuego'];
const relacionesAspectoVideo = ['16:9', '9:16', '1:1', '21:9'];
const calidadesVideo = ['alta', 'media', 'baja'];
const iluminacionesVideo = ['natural', 'artificial', 'cinemática', 'de estudio', 'ambiental'];
const movimientosCamara = ['estable', 'paneo', 'tilt', 'zoom', 'travelling'];

export default function Video() {
  const [tema, setTema] = useState('');
  const [estilo, setEstilo] = useState('');
  const [relacionAspecto, setRelacionAspecto] = useState('');
  const [calidad, setCalidad] = useState('');
  const [iluminacion, setIluminacion] = useState('');
  const [movimientoCamara, setMovimientoCamara] = useState('');
  const [prompt, setPrompt] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [temaError, setTemaError] = useState(false);

  const generarPrompt = () => {
    if (!tema.trim()) {
      setTemaError(true);
      return;
    }
    setTemaError(false);
    let p = `Genera un video de`;
    if (tema) p += ` sobre "${tema}"`;
    if (estilo) p += ` con un estilo ${estilo}`;
    if (relacionAspecto) p += ` en relación de aspecto ${relacionAspecto}`;
    if (calidad) p += ` con calidad ${calidad}`;
    if (iluminacion) p += ` con iluminación ${iluminacion}`;
    if (movimientoCamara) p += ` con movimiento de cámara ${movimientoCamara}`;
    setPrompt(p);
  };

  const copiar = () => {
    navigator.clipboard.writeText(prompt);
    setCopiado(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>🎬 Prompt de Video Avanzado</Typography>

      <Typography variant="body2" color="textSecondary" mb={2}>
        Describe el tema o la idea del video que necesitas.
        Puedes especificar el estilo visual, la relación de aspecto, la calidad,
        la iluminación y el movimiento de cámara para obtener un prompt más preciso.
      </Typography>

      <TextField
        fullWidth
        label="Tema Principal del Video"
        margin="normal"
        value={tema}
        onChange={(e) => {
          setTema(e.target.value);
          setTemaError(false);
        }}
        required
        error={temaError}
        helperText={temaError && 'Por favor, describe el tema principal del video.'}
      />

      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Estilo Visual
        </Typography>
        <FormControl fullWidth>
          <Select value={estilo} onChange={(e) => setEstilo(e.target.value)}>
            <MenuItem value="">-- Cualquiera --</MenuItem>
            {estilosVideo.map((e) => (
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
          <Select value={relacionAspecto} onChange={(e) => setRelacionAspecto(e.target.value)}>
            <MenuItem value="">-- Cualquiera --</MenuItem>
            {relacionesAspectoVideo.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Calidad / Detalle
        </Typography>
        <FormControl fullWidth>
          <Select value={calidad} onChange={(e) => setCalidad(e.target.value)}>
            <MenuItem value="">-- Cualquiera --</MenuItem>
            {calidadesVideo.map((e) => (
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
            <MenuItem value="">-- Cualquiera --</MenuItem>
            {iluminacionesVideo.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Movimiento de Cámara
        </Typography>
        <FormControl fullWidth>
          <Select value={movimientoCamara} onChange={(e) => setMovimientoCamara(e.target.value)}>
            <MenuItem value="">-- Cualquiera --</MenuItem>
            {movimientosCamara.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={generarPrompt}>
        Generar Prompt
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
            Copia el prompt de arriba y pégalo en tu IA de generación de video preferida. Actualmente no hay versiones gratuitas.
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