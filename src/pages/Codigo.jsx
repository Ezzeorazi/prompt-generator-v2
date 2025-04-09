import { useState } from 'react';
import {
  Container, Typography, Box, TextField,
  Select, MenuItem, Button, FormControl,
  Snackbar, Alert, Paper, InputLabel
} from '@mui/material';

const lenguajes = ['JavaScript', 'Python', 'HTML', 'CSS', 'SQL', 'Java', 'C++', 'React', 'TypeScript', 'PHP', 'C#', 'Ruby', 'Go', 'Swift', 'Kotlin'];
const niveles = ['principiante', 'intermedio', 'avanzado'];
const formatos = ['función', 'clase', 'script', 'componente', 'algoritmo', 'ejemplo completo'];
const propositos = ['resolver un problema específico', 'mostrar un concepto', 'ejemplo práctico', 'optimizar código existente', 'traducir código'];

export default function Codigo() {
  const [problema, setProblema] = useState('');
  const [lenguaje, setLenguaje] = useState('');
  const [nivel, setNivel] = useState('');
  const [formato, setFormato] = useState('');
  const [proposito, setProposito] = useState('');
  const [prompt, setPrompt] = useState('');
  const [copiado, setCopiado] = useState(false);

  const generarPrompt = () => {
    let p = `Mostrame un ejemplo de código`;
    if (formato) p += ` como ${formato}`;
    if (nivel) p += ` para un programador ${nivel}`;
    if (lenguaje) p += ` en ${lenguaje}`;
    if (proposito) p += ` para ${proposito}`;
    p += ` que resuelva: "${problema}"`;
    setPrompt(p);
  };

  const copiar = () => {
    navigator.clipboard.writeText(prompt);
    setCopiado(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>💻 Prompt de Código Avanzado</Typography>

      <Typography variant="body2" color="textSecondary" mb={2}>
        Describe el problema o la idea de código que necesitas.
        Puedes especificar el lenguaje, el nivel de experiencia del programador al que va dirigido,
        el formato del código y el propósito del mismo para obtener un prompt más preciso.
      </Typography>

      <TextField
        fullWidth
        label="Problema o Idea de Código"
        margin="normal"
        value={problema}
        onChange={(e) => setProblema(e.target.value)}
      />

      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Lenguaje de Programación
        </Typography>
        <FormControl fullWidth>
          <Select value={lenguaje} onChange={(e) => setLenguaje(e.target.value)}>
            <MenuItem value="">-- Cualquiera --</MenuItem>
            {lenguajes.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Nivel de Experiencia
        </Typography>
        <FormControl fullWidth>
          <Select value={nivel} onChange={(e) => setNivel(e.target.value)}>
            <MenuItem value="">-- Cualquiera --</MenuItem>
            {niveles.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Formato del Código
        </Typography>
        <FormControl fullWidth>
          <Select value={formato} onChange={(e) => setFormato(e.target.value)}>
            <MenuItem value="">-- Cualquiera --</MenuItem>
            {formatos.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Propósito del Código
        </Typography>
        <FormControl fullWidth>
          <Select value={proposito} onChange={(e) => setProposito(e.target.value)}>
            <MenuItem value="">-- Cualquiera --</MenuItem>
            {propositos.map((e) => (
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
            Copia el prompt de arriba y pégalo en tu IA de generación de código preferida (por ejemplo, ChatGPT, Copilot, etc.).
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