import { useState } from 'react';
import {
  Container, Typography, Box, TextField,
  Select, MenuItem, Button, FormControl, InputLabel,
  Snackbar, Alert
} from '@mui/material';

const estilosImagen = [
  'realista', 'grunge', 'sketch', 'pixel art', '3D', 'caricatura', 'estilo ghibli',
  'acuarela', 'cómic', 'anime', 'surrealista', 'cyberpunk', 'steampunk',
  'pop art', 'doodle', 'low poly', 'noir', 'arte abstracto', 'fantasía épica',
];

export default function Imagen() {
  const [tema, setTema] = useState('');
  const [estilo, setEstilo] = useState('');
  const [prompt, setPrompt] = useState('');
  const [copiado, setCopiado] = useState(false); // <- Snackbar state

  const generarPrompt = () => {
    const p = `Generá una imagen en estilo ${estilo || 'libre'} que represente: "${tema}"`;
    setPrompt(p);
  };

  const copiar = () => {
    navigator.clipboard.writeText(prompt);
    setCopiado(true); // Mostrar snackbar
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>🎨 Prompt de Imagen</Typography>

      <TextField
        fullWidth
        label="Tema"
        margin="normal"
        value={tema}
        onChange={(e) => setTema(e.target.value)}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Estilo</InputLabel>
        <Select value={estilo} onChange={(e) => setEstilo(e.target.value)}>
          <MenuItem value="">-- Cualquiera --</MenuItem>
          {estilosImagen.map((e) => (
            <MenuItem key={e} value={e}>{e}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={generarPrompt}>
        Generar
      </Button>

      {prompt && (
        <Box mt={4}>
          <Typography variant="h6">Prompt generado:</Typography>
          <Typography variant="body1" sx={{ my: 2 }}>{prompt}</Typography>
          <Button variant="outlined" onClick={copiar}>📋 Copiar</Button>
        </Box>
      )}

      {/* Snackbar */}
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
