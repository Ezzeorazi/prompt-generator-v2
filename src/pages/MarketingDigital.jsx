import { useState } from 'react';
import {
  Container, Typography, Box, TextField,
  Select, MenuItem, Button, FormControl,
  Snackbar, Alert, Paper, InputLabel, FormHelperText
} from '@mui/material';

const tiposMarketing = ['brief-de-marca', 'buyer-persona', 'calendario-contenido', 'contenido-campana'];
const plataformas = ['Instagram', 'LinkedIn', 'TikTok', 'Facebook', 'Twitter/X', 'YouTube', 'Pinterest', 'Multi-plataforma'];
const objetosCampana = ['conciencia de marca', 'generación de leads', 'ventas', 'engagement', 'fidelización', 'lanzamiento de producto'];
const herramientasIA = ['ChatGPT', 'Google Gemini', 'Claude', 'Cualquiera'];

export default function MarketingDigital() {
  const [tipoMarketing, setTipoMarketing] = useState('');
  const [nombreMarca, setNombreMarca] = useState('');
  const [descripcionMarca, setDescripcionMarca] = useState('');
  const [industria, setIndustria] = useState('');
  const [usarSmart, setUsarSmart] = useState('no');
  const [compradores, setCompradoresPersona] = useState('');
  const [painPoints, setPainPoints] = useState('');
  const [plataformaSeleccionada, setPlataformaSeleccionada] = useState('');
  const [duracionCalendario, setDuracionCalendario] = useState('mes');
  const [frecuenciaPublicacion, setFrecuenciaPublicacion] = useState('');
  const [objetoCampana, setObjetoCampana] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [herramientaIA, setHerramientaIA] = useState('');
  const [prompt, setPrompt] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [error, setError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  const generarPrompt = () => {
    setError(false);
    setMensajeError('');

    // Validación básica
    if (!tipoMarketing.trim()) {
      setError(true);
      setMensajeError('Por favor, selecciona un tipo de contenido de marketing.');
      return;
    }

    if (!nombreMarca.trim()) {
      setError(true);
      setMensajeError('Por favor, ingresa el nombre de la marca.');
      return;
    }

    let p = '';

    // Generar prompts según el tipo seleccionado
    if (tipoMarketing === 'brief-de-marca') {
      p = `Crea un brief de marca completo para "${nombreMarca}"`;
      if (descripcionMarca) p += ` que es una empresa de ${descripcionMarca}`;
      if (industria) p += ` en la industria de ${industria}`;
      if (usarSmart === 'si') {
        p += `. El brief debe incluir objetivos SMART (Específicos, Medibles, Alcanzables, Relevantes y Temporizados)`;
      }
      p += `. Incluye: misión, visión, valores, posicionamiento, público objetivo, propuesta de valor, línea gráfica general, tono de voz y recomendaciones de estrategia`;
    } 
    
    else if (tipoMarketing === 'buyer-persona') {
      p = `Crea 2-3 buyer personas detallados para "${nombreMarca}"`;
      if (descripcionMarca) p += ` que ofrece ${descripcionMarca}`;
      if (industria) p += ` en la industria de ${industria}`;
      if (compradores) p += ` enfocado en ${compradores}`;
      p += `. Para cada persona incluye: nombre, edad, cargo, objetivos principales`;
      if (painPoints) p += `, desafíos clave como ${painPoints}`;
      p += `, comportamiento de compra, canales preferidos, nivel de presupuesto y cómo tu marca puede resolver sus necesidades`;
    } 
    
    else if (tipoMarketing === 'calendario-contenido') {
      p = `Crea un calendario de contenido de marketing para "${nombreMarca}"`;
      if (descripcionMarca) p += ` que ofrece ${descripcionMarca}`;
      if (duracionCalendario) p += ` para un ${duracionCalendario === 'mes' ? 'mes' : duracionCalendario === 'trimestre' ? 'trimestre' : 'año'}`;
      if (plataformaSeleccionada) p += ` en ${plataformaSeleccionada}`;
      if (frecuenciaPublicacion) p += ` con una frecuencia de ${frecuenciaPublicacion} publicaciones`;
      p += `. Incluye: temas por semana, tipos de contenido (educativo, promocional, entretenimiento), días y horarios recomendados para publicar, hashtags, CTA (call to action) y métricas a monitorear`;
    } 
    
    else if (tipoMarketing === 'contenido-campana') {
      p = `Crea una estrategia de contenido para una campaña de marketing de "${nombreMarca}"`;
      if (descripcionMarca) p += ` que ofrece ${descripcionMarca}`;
      if (objetoCampana) p += ` con el objetivo de ${objetoCampana}`;
      if (presupuesto) p += ` con presupuesto de ${presupuesto}`;
      p += `. Incluye: copy atractivo para diferentes formatos (post, historia, carrusel, video corto), mensajes clave, ángulos creativos, propuestas de valor diferenciadas, variaciones de CTA y recomendaciones de timing y segmentación`;
    }

    if (herramientaIA) {
      p += `\n\nOptimiza este contenido para ser usado en ${herramientaIA}. Si es posible, estructura la respuesta donde sea detallada pero práctica para implementar inmediatamente.`;
    }

    setPrompt(p);
  };

  const copiar = () => {
    navigator.clipboard.writeText(prompt);
    setCopiado(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>📱 Prompt de Marketing Digital</Typography>

      <Typography variant="body2" color="textSecondary" mb={3}>
        Genera prompts para crear estrategias de marketing con IA. Puedes usar estos prompts en 
        <strong> ChatGPT</strong>, <strong>Google Gemini</strong>, <strong>Claude</strong> o cualquier herramienta de IA que prefieras.
      </Typography>

      <Typography variant="body2" color="textSecondary" mb={3}>
        Selecciona el tipo de contenido de marketing que necesitas, proporciona detalles sobre tu marca 
        y te generaremos un prompt optimizado para obtener resultados profesionales.
      </Typography>

      {/* Tipo de Marketing */}
      <Box mt={2}>
        <FormControl fullWidth>
          <InputLabel>Tipo de Contenido de Marketing</InputLabel>
          <Select
            value={tipoMarketing}
            onChange={(e) => setTipoMarketing(e.target.value)}
            label="Tipo de Contenido de Marketing"
          >
            <MenuItem value="">-- Selecciona una opción --</MenuItem>
            <MenuItem value="brief-de-marca">📋 Brief de Marca</MenuItem>
            <MenuItem value="buyer-persona">👤 Buyer Persona</MenuItem>
            <MenuItem value="calendario-contenido">📅 Calendario de Contenido</MenuItem>
            <MenuItem value="contenido-campana">🎯 Contenido de Campaña</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Campo común: Nombre de la Marca */}
      <TextField
        fullWidth
        label="Nombre de la Marca / Empresa"
        margin="normal"
        value={nombreMarca}
        onChange={(e) => {
          setNombreMarca(e.target.value);
          setError(false);
        }}
        required
        helperText="Ingresa el nombre de tu marca o empresa"
      />

      {/* Campo común: Descripción de la Marca */}
      <TextField
        fullWidth
        label="¿Qué ofrece o hace tu marca?"
        margin="normal"
        multiline
        rows={2}
        value={descripcionMarca}
        onChange={(e) => setDescripcionMarca(e.target.value)}
        helperText="Ej: ropa sostenible, software de gestión, servicios de coaching"
      />

      {/* Campo común: Industria */}
      <TextField
        fullWidth
        label="Industria"
        margin="normal"
        value={industria}
        onChange={(e) => setIndustria(e.target.value)}
        helperText="Ej: tecnología, moda, educación, finanzas"
      />

      {/* Campos específicos según tipo */}
      {tipoMarketing === 'brief-de-marca' && (
        <Box mt={2}>
          <FormControl fullWidth>
            <InputLabel>¿Incluir objetivos SMART?</InputLabel>
            <Select
              value={usarSmart}
              onChange={(e) => setUsarSmart(e.target.value)}
              label="¿Incluir objetivos SMART?"
            >
              <MenuItem value="no">No</MenuItem>
              <MenuItem value="si">Sí, incluir objetivos SMART</MenuItem>
            </Select>
            <FormHelperText>SMART = Específicos, Medibles, Alcanzables, Relevantes, Temporizados</FormHelperText>
          </FormControl>
        </Box>
      )}

      {tipoMarketing === 'buyer-persona' && (
        <>
          <TextField
            fullWidth
            label="¿A quién le vendes principalmente?"
            margin="normal"
            value={compradores}
            onChange={(e) => setCompradoresPersona(e.target.value)}
            helperText="Ej: empresarios, padres millennials, estudiantes de pregrado"
          />
          <TextField
            fullWidth
            label="¿Cuáles son sus principales desafíos o problemas?"
            margin="normal"
            multiline
            rows={2}
            value={painPoints}
            onChange={(e) => setPainPoints(e.target.value)}
            helperText="Ej: falta de tiempo, presupuesto limitado, formación deficiente"
          />
        </>
      )}

      {tipoMarketing === 'calendario-contenido' && (
        <>
          <Box mt={2}>
            <FormControl fullWidth>
              <InputLabel>Duración del Calendario</InputLabel>
              <Select
                value={duracionCalendario}
                onChange={(e) => setDuracionCalendario(e.target.value)}
                label="Duración del Calendario"
              >
                <MenuItem value="mes">1 Mes</MenuItem>
                <MenuItem value="trimestre">3 Meses (Trimestre)</MenuItem>
                <MenuItem value="semestre">6 Meses (Semestre)</MenuItem>
                <MenuItem value="ano">1 Año</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box mt={2}>
            <FormControl fullWidth>
              <InputLabel>Plataformas</InputLabel>
              <Select
                value={plataformaSeleccionada}
                onChange={(e) => setPlataformaSeleccionada(e.target.value)}
                label="Plataformas"
              >
                <MenuItem value="">-- Selecciona --</MenuItem>
                {plataformas.map((p) => (
                  <MenuItem key={p} value={p}>{p}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TextField
            fullWidth
            label="Frecuencia de Publicación"
            margin="normal"
            value={frecuenciaPublicacion}
            onChange={(e) => setFrecuenciaPublicacion(e.target.value)}
            helperText="Ej: 3 veces por semana, diario, 2 veces al día"
          />
        </>
      )}

      {tipoMarketing === 'contenido-campana' && (
        <>
          <Box mt={2}>
            <FormControl fullWidth>
              <InputLabel>Objetivo de la Campaña</InputLabel>
              <Select
                value={objetoCampana}
                onChange={(e) => setObjetoCampana(e.target.value)}
                label="Objetivo de la Campaña"
              >
                <MenuItem value="">-- Selecciona --</MenuItem>
                {objetosCampana.map((o) => (
                  <MenuItem key={o} value={o}>{o}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TextField
            fullWidth
            label="Presupuesto (opcional)"
            margin="normal"
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)}
            helperText="Ej: $500-1000, bajo presupuesto, sin límite"
          />
        </>
      )}

      {/* Herramienta de IA */}
      <Box mt={2}>
        <FormControl fullWidth>
          <InputLabel>Herramienta de IA (Opcional)</InputLabel>
          <Select
            value={herramientaIA}
            onChange={(e) => setHerramientaIA(e.target.value)}
            label="Herramienta de IA (Opcional)"
          >
            <MenuItem value="">-- Cualquiera --</MenuItem>
            {herramientasIA.map((h) => (
              <MenuItem key={h} value={h}>{h}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Botón Generar */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
        onClick={generarPrompt}
      >
        Generar Prompt 📝
      </Button>

      {/* Error Snackbar */}
      <Snackbar
        open={error}
        autoHideDuration={4000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(false)} severity="error">
          {mensajeError}
        </Alert>
      </Snackbar>

      {/* Prompt Generado */}
      {prompt && (
        <Paper sx={{ p: 3, mt: 3, backgroundColor: '#f5f5f5' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
            ✨ Tu Prompt Generado:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              mb: 2,
              fontFamily: 'monospace',
              backgroundColor: 'white',
              p: 2,
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          >
            {prompt}
          </Typography>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={copiar}
          >
            {copiado ? '✓ Copiado al Portapapeles' : '📋 Copiar Prompt'}
          </Button>
        </Paper>
      )}

      {/* Snackbar de Confirmación */}
      <Snackbar
        open={copiado}
        autoHideDuration={2000}
        onClose={() => setCopiado(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setCopiado(false)} severity="success">
          ¡Prompt copiado al portapapeles!
        </Alert>
      </Snackbar>
    </Container>
  );
}
