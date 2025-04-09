import { useState } from 'react';
import {
  Container, Typography, Box, TextField,
  Select, MenuItem, Button, FormControl,
  Snackbar, Alert, Paper, Link as MuiLink
} from '@mui/material';

const estilos3D = ['realista', 'estilizado', 'sci-fi', 'fantasía', 'minimalista', 'orgánico', 'mecánico'];
const detalles3D = ['alto detalle', 'medio detalle', 'bajo detalle', 'texturizado', 'pulido', 'rugoso'];
const materiales3D = ['metal', 'madera', 'vidrio', 'plástico', 'piedra', 'piel', 'tela'];
const iluminaciones3D = ['iluminación global', 'iluminación de estudio', 'iluminación volumétrica', 'luz natural', 'luz artificial'];
const angulosCamara3D = ['vista frontal', 'vista lateral', 'vista superior', 'vista isométrica', 'plano detalle', 'vista aérea'];

export default function Diseno3D() {
  const [objeto, setObjeto] = useState('');
  const [estilo, setEstilo] = useState('');
  const [detalle, setDetalle] = useState('');
  const [material, setMaterial] = useState('');
  const [iluminacion, setIluminacion] = useState('');
  const [anguloCamara, setAnguloCamara] = useState('');
  const [prompt, setPrompt] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [objetoError, setObjetoError] = useState(false);

  const generarPrompt = () => {
    if (!objeto.trim()) {
      setObjetoError(true);
      return;
    }
    setObjetoError(false);
    let p = `Genera un modelo 3D de`;
    if (objeto) p += ` un "${objeto}"`;
    if (estilo) p += ` con un estilo ${estilo}`;
    if (detalle) p += ` con ${detalle}`;
    if (material) p += ` hecho de ${material}`;
    if (iluminacion) p += ` con iluminación ${iluminacion}`;
    if (anguloCamara) p += ` desde un ángulo de cámara ${anguloCamara}`;
    setPrompt(p);
  };

  const copiar = () => {
    navigator.clipboard.writeText(prompt);
    setCopiado(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>📐 Prompt de Diseño y Modelado 3D</Typography>

      <Typography variant="body2" color="textSecondary" mb={2}>
        Puedes usar estos prompts en diversas herramientas de generación de modelos 3D con IA.
        Algunas opciones populares incluyen:
        <MuiLink href="https://meshy.ai/" target="_blank" rel="noopener noreferrer">Meshy (Beta)</MuiLink>,
        <MuiLink href="https://leonardo.ai/" target="_blank" rel="noopener noreferrer">Leonardo AI</MuiLink> (explora sus funciones),
        y mantente atento a proyectos de investigación y código abierto.
      </Typography>

      <Typography variant="body2" color="textSecondary" mb={2}>
        Describe el objeto o la escena 3D que necesitas.
        Puedes especificar el estilo, el nivel de detalle, el material,
        la iluminación y el ángulo de cámara para obtener un prompt más preciso.
      </Typography>

      <TextField
        fullWidth
        label="Objeto o Escena 3D Principal"
        margin="normal"
        value={objeto}
        onChange={(e) => {
          setObjeto(e.target.value);
          setObjetoError(false);
        }}
        required
        error={objetoError}
        helperText={objetoError && 'Por favor, describe el objeto o la escena 3D principal.'}
      />

      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Estilo
        </Typography>
        <FormControl fullWidth>
          <Select value={estilo} onChange={(e) => setEstilo(e.target.value)}>
            <MenuItem value="">-- Cualquiera --</MenuItem>
            {estilos3D.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Nivel de Detalle
        </Typography>
        <FormControl fullWidth>
          <Select value={detalle} onChange={(e) => setDetalle(e.target.value)}>
            <MenuItem value="">-- Cualquiera --</MenuItem>
            {detalles3D.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Material
        </Typography>
        <FormControl fullWidth>
          <Select value={material} onChange={(e) => setMaterial(e.target.value)}>
            <MenuItem value="">-- Cualquiera --</MenuItem>
            {materiales3D.map((e) => (
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
            {iluminaciones3D.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Ángulo de Cámara
        </Typography>
        <FormControl fullWidth>
          <Select value={anguloCamara} onChange={(e) => setAnguloCamara(e.target.value)}>
            <MenuItem value="">-- Cualquiera --</MenuItem>
            {angulosCamara3D.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={generarPrompt}>
        Generar Prompt 3D
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
            Copia el prompt de arriba y pégalo en tu IA de diseño 3D preferida.
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