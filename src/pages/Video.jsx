import React, { useState, useMemo, useCallback } from 'react';
import { 
  Box, Typography, Button, TextField, Paper, Grid, 
  Chip, Snackbar, Alert, Container, MenuItem 
} from '@mui/material';
import { Copy, Terminal, CheckCircle, BookOpen, RotateCcw, Video, Film, Clapperboard } from 'lucide-react';

// Templates de video profesionales para inspirar a tus lectores
const EJEMPLOS_VIDEO = [
  {
    titulo: "🏎️ Cinematic Product",
    datos: {
      escena: "Un reloj de lujo sumergido en agua oscura con burbujas ascendentes.",
      estilo: "Publicidad Cinematográfica / High-End",
      movimiento: "Macro orbit shot lento alrededor de las manecillas.",
      iluminacion: "Luz dramática lateral (Chiaroscuro) con destellos dorados.",
      atmosfera: "Elegante, misteriosa, resolución 4k, cámara lenta (slow motion)."
    }
  },
  {
    titulo: "🌿 Paisaje Drone",
    datos: {
      escena: "Un bosque de pinos cubierto por una densa niebla al amanecer.",
      estilo: "Fotorealismo / Documental",
      movimiento: "Drone fly-through shot atravesando las copas de los árboles.",
      iluminacion: "Luz natural suave de mañana, rayos de sol filtrándose (God rays).",
      atmosfera: "Pacífica, épica, colores desaturados, atmósfera cinematográfica."
    }
  },
  {
    titulo: "🥯 Lifestyle / Food",
    datos: {
      escena: "Café vertiéndose en una taza con vapor saliendo en primer plano.",
      estilo: "Estilo minimalista / Social Media",
      movimiento: "Tilt down suave siguiendo el flujo del líquido.",
      iluminacion: "Luz de ventana suave y cálida.",
      atmosfera: "Cálida, hogareña, profundidad de campo desenfocada (Bokeh)."
    }
  }
];

const ESTADO_INICIAL = {
  escena: '',
  estilo: '',
  movimiento: '',
  iluminacion: '',
  atmosfera: ''
};

export default function VideoPromptGenerator() {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [copiado, setCopiado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const promptGenerado = useMemo(() => {
    const { escena, estilo, movimiento, iluminacion, atmosfera } = formulario;
    
    if (!escena.trim()) return '';

    const partes = [];
    partes.push(`Cinematic AI Video Prompt: ${escena.trim()}\n`);
    
    partes.push(`[TECHNICAL SPECS]`);
    if (estilo.trim()) partes.push(`- Visual Style: ${estilo}`);
    if (movimiento.trim()) partes.push(`- Camera Movement: ${movimiento}`);
    if (iluminacion.trim()) partes.push(`- Lighting: ${iluminacion}`);
    
    partes.push(`\n[MOOD & QUALITY]`);
    if (atmosfera.trim()) partes.push(`- Atmosphere: ${atmosfera}`);
    partes.push(`- Settings: High definition, realistic textures, fluid motion, 24fps.`);

    return partes.join('\n').trim();
  }, [formulario]);

  const copiarAlPortapapeles = useCallback(async () => {
    if (!promptGenerado) return;
    try {
      await navigator.clipboard.writeText(promptGenerado);
      setCopiado(true);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  }, [promptGenerado]);

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Paper elevation={4} sx={{ overflow: 'hidden', borderRadius: 2, bgcolor: '#0f172a' }}>
        
        {/* Cabecera Estilo Consola Video */}
        <Box sx={{ bgcolor: '#020617', p: 3, color: 'white', borderBottom: '1px solid #1e293b' }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 'bold', fontFamily: 'monospace' }}>
            <Film color="#f43f5e" /> Video_Director_AI_v3
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1 }}>
            Generá briefings cinematográficos para Runway, Luma o Kling AI.
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          {/* Templates */}
          <Box sx={{ mb: 4, p: 2.5, bgcolor: '#1e293b', borderRadius: 2, border: '1px solid #334155' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#cbd5e1', fontWeight: 'bold' }}>
                <Clapperboard size={16} color="#f43f5e" /> Escenas de Referencia
              </Typography>
              <Button 
                size="small" 
                onClick={() => setFormulario(ESTADO_INICIAL)} 
                startIcon={<RotateCcw size={14} />} 
                sx={{ color: '#ef4444', textTransform: 'none' }}
              >
                Resetear Cámara
              </Button>
            </Box>
            <Grid container spacing={1.5}>
              {EJEMPLOS_VIDEO.map((ej, idx) => (
                <Grid item key={idx}>
                  <Chip 
                    label={ej.titulo} 
                    onClick={() => setFormulario(ej.datos)}
                    sx={{ 
                      bgcolor: '#0f172a', 
                      color: '#e2e8f0', 
                      border: '1px solid #475569',
                      '&:hover': { bgcolor: '#be123c', borderColor: '#f43f5e', color: 'white' } 
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* TIP: NANO BANANA 2 */}
          <Box sx={{ mb: 4, p: 2.5, bgcolor: '#4c051915', borderRadius: 2, border: '1px dashed #f43f5e', display: 'flex', gap: 2 }}>
            <Video size={32} color="#f43f5e" style={{ flexShrink: 0 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ color: '#fecdd3', fontWeight: 'bold', mb: 0.5 }}>
                Uso Avanzado con "Nano Banana 2" (Storyboard Mode)
              </Typography>
              <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.6 }}>
                Antes de generar el video, pegá este prompt en Gemini (con su motor Nano Banana 2) y pedile: 
                <strong> "Basado en este prompt, creame un Storyboard de 4 paneles y una lista de planos detallada"</strong>. 
                Esto te va a permitir visualizar la estructura del video y los ángulos antes de gastar tus créditos en la IA de generación de video.
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={4}>
            {/* Inputs del Director */}
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex', flexDirection: 'column', gap: 2.5,
                '& .MuiTextField-root': {
                  '& label': { color: '#94a3b8' },
                  '& label.Mui-focused': { color: '#f43f5e' },
                  '& .MuiOutlinedInput-root': {
                    color: '#f8fafc',
                    bgcolor: '#1e293b',
                    '& fieldset': { borderColor: '#334155' },
                    '&:hover fieldset': { borderColor: '#475569' },
                    '&.Mui-focused fieldset': { borderColor: '#f43f5e' },
                  }
                }
              }}>
                <TextField 
                  label="1. Acción / Escena Principal" 
                  name="escena" 
                  value={formulario.escena} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline 
                  minRows={2} 
                  placeholder="¿Qué pasa en el video? Ej: Un astronauta caminando por un desierto rojo..." 
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField label="2. Estilo Visual" name="estilo" value={formulario.estilo} onChange={handleChange} fullWidth size="small" placeholder="Ej: Cyberpunk, VHS, Realista" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="3. Movimiento de Cámara" name="movimiento" value={formulario.movimiento} onChange={handleChange} fullWidth size="small" placeholder="Ej: Zoom in lento, Paneo, Drone" />
                  </Grid>
                </Grid>

                <TextField 
                  label="4. Iluminación" 
                  name="iluminacion" 
                  value={formulario.iluminacion} 
                  onChange={handleChange} 
                  fullWidth 
                  size="small"
                  placeholder="Ej: Luz de atardecer, Neones, Flash de discoteca..." 
                />
                
                <TextField 
                  label="5. Atmósfera y Calidad" 
                  name="atmosfera" 
                  value={formulario.atmosfera} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline 
                  minRows={2}
                  placeholder="Ej: Sombrío, nostálgico, 4k, cámara lenta..." 
                />
              </Box>
            </Grid>

            {/* Terminal de Output */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Paper sx={{ 
                  flexGrow: 1, 
                  bgcolor: '#000000', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  overflow: 'hidden', 
                  minHeight: 450,
                  border: '1px solid #334155'
                }}>
                  <Box sx={{ bgcolor: '#1e293b', px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ef4444' }}></Box>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#eab308' }}></Box>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#22c55e' }}></Box>
                    </Box>
                    <Button 
                      variant="contained" 
                      onClick={copiarAlPortapapeles} 
                      disabled={!promptGenerado}
                      startIcon={copiado ? <CheckCircle size={14} /> : <Copy size={14} />}
                      sx={{ 
                        bgcolor: copiado ? '#10b981' : '#f43f5e', 
                        textTransform: 'none', 
                        py: 0.5,
                        '&:hover': { bgcolor: copiado ? '#059669' : '#e11d48' }
                      }}
                    >
                      {copiado ? 'Copiado' : 'Copiar para IA'}
                    </Button>
                  </Box>
                  
                  <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
                    {promptGenerado ? (
                      <Typography component="pre" sx={{ 
                        color: '#fda4af', 
                        fontFamily: "'Fira Code', monospace", 
                        whiteSpace: 'pre-wrap', 
                        fontSize: '0.875rem',
                        lineHeight: 1.6
                      }}>
                        {promptGenerado}
                      </Typography>
                    ) : (
                      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                        <Film size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
                        <Typography variant="body2" align="center" sx={{ fontFamily: 'monospace' }}>
                           Luces, cámara...<br/>
                           Definí una escena para generar el guion técnico.
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Snackbar open={copiado} autoHideDuration={2000} onClose={() => setCopiado(false)}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>Prompt de Video listo para producir 🎬</Alert>
      </Snackbar>
    </Container>
  );
}