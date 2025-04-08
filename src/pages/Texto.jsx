import { useState } from 'react';
import {
  Container, Typography, Box, TextField,
  Select, MenuItem, Button, FormControl, InputLabel,
  Snackbar, Alert
} from '@mui/material';

const estilosTexto = [
  'poético', 'humorístico', 'reflexivo', 'épico', 'oscuro', 'romántico', 'dramático',
  'inspirador', 'irónico', 'filosófico', 'realista', 'crítico', 'fantástico',
];

export default function Texto() {
  const [tema, setTema] = useState('');
  const [estilo, setEstilo] = useState('');
  const [prompt, setPrompt] = useState('');
  const [copiado, setCopiado] = useState(false);

  const generarPrompt = () => {
    const p = `Escribí un texto ${estilo || 'neutro'} sobre: "${tema}"`;
    setPrompt(p);
  };

  const copiar = () => {
    navigator.clipboard.writeText(prompt);
    setCopiado(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>📝 Prompt de Texto</Typography>

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
          {estilosTexto.map((e) => (
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
