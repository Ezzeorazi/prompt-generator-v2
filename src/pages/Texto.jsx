import { useState } from 'react';
import {
  Container, Typography, Box, TextField,
  Select, MenuItem, Button, FormControl,
  Snackbar, Alert, Paper
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
  const [maxCaracteres, setMaxCaracteres] = useState('');

  const generarPrompt = () => {
    let p = `Escribí un texto ${estilo || 'neutro'} sobre: "${tema}"`;
    if (maxCaracteres) {
      p += ` con un máximo de ${maxCaracteres} caracteres.`;
    }
    setPrompt(p);
  };

  const copiar = () => {
    navigator.clipboard.writeText(prompt);
    setCopiado(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>📝 Prompt de Texto Avanzado</Typography>

      <Typography variant="body2" color="textSecondary" mb={2}>
        Ingresa un tema y selecciona un estilo para generar un prompt de texto avanzado.
        Este prompt puede ser utilizado en modelos de lenguaje como ChatGPT para obtener textos creativos y específicos.
        Opcionalmente, puedes especificar una cantidad máxima de caracteres deseada para el texto generado.
      </Typography>

      <TextField
        fullWidth
        label="Tema principal del texto"
        margin="normal"
        value={tema}
        onChange={(e) => setTema(e.target.value)}
      />

      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Estilo del texto
        </Typography>
        <FormControl fullWidth>
          <Select value={estilo} onChange={(e) => setEstilo(e.target.value)}>
            <MenuItem value="">-- Cualquiera --</MenuItem>
            {estilosTexto.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TextField
        fullWidth
        label="Máximo de caracteres (opcional)"
        margin="normal"
        type="number"
        value={maxCaracteres}
        onChange={(e) => setMaxCaracteres(e.target.value)}
        helperText="Especifica la longitud máxima aproximada del texto."
      />

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
            Copia el prompt de arriba y pégalo en tu IA de generación de texto preferida (por ejemplo, ChatGPT).
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