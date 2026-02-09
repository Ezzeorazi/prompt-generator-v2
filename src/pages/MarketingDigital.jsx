import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  Snackbar,
  Alert,
  Paper,
  InputLabel,
  FormHelperText
} from '@mui/material';

export default function MarketingDigital() {
  const [tipo, setTipo] = useState('');
  const [marca, setMarca] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [industria, setIndustria] = useState('');
  const [usarSmart, setUsarSmart] = useState('no');

  const [audiencia, setAudiencia] = useState('');
  const [dolores, setDolores] = useState('');

  const [duracion, setDuracion] = useState('mes');
  const [plataforma, setPlataforma] = useState('');
  const [frecuencia, setFrecuencia] = useState('');

  const [objetivoCampana, setObjetivoCampana] = useState('');
  const [presupuesto, setPresupuesto] = useState('');

  const [prompt, setPrompt] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [error, setError] = useState(false);

  const generarPrompt = () => {
    if (!tipo || !marca.trim()) {
      setError(true);
      return;
    }

    let p = `Actuá como un especialista senior en marketing digital.\n\n`;
    p += `Contexto:\n`;
    p += `Marca: ${marca}\n`;
    if (descripcion) p += `Descripción: ${descripcion}\n`;
    if (industria) p += `Industria: ${industria}\n`;

    if (tipo === 'brief') {
      p += `\nObjetivo:\nCrear un brief de marca profesional.\n\n`;
      p += `Entregable esperado:\n`;
      p += `- Propósito de marca\n`;
      p += `- Misión y visión\n`;
      p += `- Propuesta de valor\n`;
      p += `- Público objetivo\n`;
      p += `- Personalidad y tono de comunicación\n`;
      p += `- Posicionamiento\n`;
      p += `- Recomendaciones estratégicas\n`;
      if (usarSmart === 'si') {
        p += `- Objetivos definidos con metodología SMART\n`;
      }
    }

    if (tipo === 'buyer') {
      p += `\nObjetivo:\nDefinir buyer personas claros y accionables.\n\n`;
      if (audiencia) p += `Audiencia principal: ${audiencia}\n`;
      if (dolores) p += `Dolores y problemas: ${dolores}\n`;

      p += `\nEntregable esperado:\n`;
      p += `Para cada buyer persona incluí:\n`;
      p += `- Perfil demográfico\n`;
      p += `- Objetivos\n`;
      p += `- Motivaciones\n`;
      p += `- Frustraciones\n`;
      p += `- Objeciones de compra\n`;
      p += `- Canales de información\n`;
      p += `- Tipo de contenido que consume\n`;
    }

    if (tipo === 'calendario') {
      p += `\nObjetivo:\nCrear un calendario de contenidos estratégico.\n\n`;
      p += `Condiciones:\n`;
      p += `Duración: ${duracion}\n`;
      if (plataforma) p += `Plataforma: ${plataforma}\n`;
      if (frecuencia) p += `Frecuencia: ${frecuencia}\n`;

      p += `\nEntregable esperado:\n`;
      p += `- Ideas de contenido por semana\n`;
      p += `- Objetivo de cada publicación\n`;
      p += `- Formato sugerido\n`;
      p += `- CTA recomendado\n`;
      p += `- Métricas a medir\n`;
    }

    if (tipo === 'campana') {
      p += `\nObjetivo:\nDiseñar una campaña de marketing digital.\n\n`;
      if (objetivoCampana) p += `Objetivo de la campaña: ${objetivoCampana}\n`;
      if (presupuesto) p += `Presupuesto estimado: ${presupuesto}\n`;

      p += `\nEntregable esperado:\n`;
      p += `- Concepto creativo\n`;
      p += `- Mensaje principal\n`;
      p += `- Ideas de contenido\n`;
      p += `- Canales recomendados\n`;
      p += `- KPIs clave\n`;
    }

    setPrompt(p);
    setError(false);
  };

  const copiar = () => {
    navigator.clipboard.writeText(prompt);
    setCopiado(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        📈 Prompt de Marketing Digital
      </Typography>

      <Typography variant="body2" color="textSecondary" mb={2}>
        Genera prompts profesionales para branding, contenidos y campañas de marketing.
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Tipo de Prompt</InputLabel>
        <Select value={tipo} label="Tipo de Prompt" onChange={(e) => setTipo(e.target.value)}>
          <MenuItem value="">-- Selecciona --</MenuItem>
          <MenuItem value="brief">📋 Brief de Marca</MenuItem>
          <MenuItem value="buyer">👤 Buyer Persona</MenuItem>
          <MenuItem value="calendario">📅 Calendario de Contenidos</MenuItem>
          <MenuItem value="campana">🎯 Campaña de Marketing</MenuItem>
        </Select>
        <FormHelperText>Elige el tipo de contenido que querés generar</FormHelperText>
      </FormControl>

      <TextField
        fullWidth
        label="Nombre de la marca"
        margin="normal"
        value={marca}
        onChange={(e) => setMarca(e.target.value)}
        required
      />

      <TextField
        fullWidth
        label="¿Qué hace la marca?"
        margin="normal"
        multiline
        rows={2}
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <TextField
        fullWidth
        label="Industria"
        margin="normal"
        value={industria}
        onChange={(e) => setIndustria(e.target.value)}
      />

      {tipo === 'brief' && (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>¿Incluir objetivos SMART?</InputLabel>
          <Select value={usarSmart} label="¿Incluir objetivos SMART?" onChange={(e) => setUsarSmart(e.target.value)}>
            <MenuItem value="no">No</MenuItem>
            <MenuItem value="si">Sí</MenuItem>
          </Select>
        </FormControl>
      )}

      {tipo === 'buyer' && (
        <>
          <TextField
            fullWidth
            label="Audiencia principal"
            margin="normal"
            value={audiencia}
            onChange={(e) => setAudiencia(e.target.value)}
          />
          <TextField
            fullWidth
            label="Principales dolores o problemas"
            margin="normal"
            multiline
            rows={2}
            value={dolores}
            onChange={(e) => setDolores(e.target.value)}
          />
        </>
      )}

      {tipo === 'calendario' && (
        <>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Duración</InputLabel>
            <Select value={duracion} label="Duración" onChange={(e) => setDuracion(e.target.value)}>
              <MenuItem value="mes">1 mes</MenuItem>
              <MenuItem value="trimestre">3 meses</MenuItem>
              <MenuItem value="semestre">6 meses</MenuItem>
              <MenuItem value="anio">1 año</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Plataforma"
            margin="normal"
            value={plataforma}
            onChange={(e) => setPlataforma(e.target.value)}
          />

          <TextField
            fullWidth
            label="Frecuencia de publicación"
            margin="normal"
            value={frecuencia}
            onChange={(e) => setFrecuencia(e.target.value)}
          />
        </>
      )}

      {tipo === 'campana' && (
        <>
          <TextField
            fullWidth
            label="Objetivo de la campaña"
            margin="normal"
            value={objetivoCampana}
            onChange={(e) => setObjetivoCampana(e.target.value)}
          />
          <TextField
            fullWidth
            label="Presupuesto"
            margin="normal"
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)}
          />
        </>
      )}

      <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={generarPrompt}>
        Generar
      </Button>

      {prompt && (
        <Box mt={4}>
          <Paper sx={{ backgroundColor: '#f0f0f0', p: 2, mb: 1 }}>
            <Typography
              sx={{
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                color: '#444'
              }}
            >
              {prompt}
            </Typography>
          </Paper>

          <Button variant="outlined" fullWidth onClick={copiar}>
            📋 Copiar
          </Button>

          <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic', mt: 2 }}>
            Copia el prompt de arriba y pégalo en tu IA de texto preferida, como
            <strong> ChatGPT</strong>, <strong> Google Gemini</strong> o <strong> Claude</strong>,
            para generar el contenido.
          </Typography>
        </Box>
      )}

      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error">Completá el tipo y el nombre de la marca.</Alert>
      </Snackbar>

      <Snackbar
        open={copiado}
        autoHideDuration={2000}
        onClose={() => setCopiado(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success">Prompt copiado al portapapeles ✅</Alert>
      </Snackbar>
    </Container>
  );
}