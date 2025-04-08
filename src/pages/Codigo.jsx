import { useState } from 'react';
import {
  Container, Typography, Box, TextField,
  Select, MenuItem, Button, FormControl, InputLabel,
  Snackbar, Alert
} from '@mui/material';

const lenguajes = ['JavaScript', 'Python', 'HTML', 'CSS', 'SQL', 'Java', 'C++', 'React'];

export default function Codigo() {
  const [tema, setTema] = useState('');
  const [lenguaje, setLenguaje] = useState('');
  const [prompt, setPrompt] = useState('');
  const [copiado, setCopiado] = useState(false);

  const generarPrompt = () => {
    const p = `Mostrame un ejemplo en ${lenguaje || 'cualquier lenguaje'} que resuelva: "${tema}"`;
    setPrompt(p);
  };

  const copiar = () => {
    navigator.clipboard.writeText(prompt);
    setCopiado(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>💻 Prompt de Código</Typography>

      <TextField
        fullWidth
        label="Problema o Idea"
        margin="normal"
        value={tema}
        onChange={(e) => setTema(e.target.value)}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Lenguaje</InputLabel>
        <Select value={lenguaje} onChange={(e) => setLenguaje(e.target.value)}>
          <MenuItem value="">-- Cualquiera --</MenuItem>
          {lenguajes.map((e) => (
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
