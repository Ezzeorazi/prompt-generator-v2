import React, { useState, useMemo, useCallback } from 'react';
import { 
  Box, Typography, Button, TextField, Paper, Grid, 
  Chip, Snackbar, Alert, Container, MenuItem 
} from '@mui/material';
import { Copy, Terminal, CheckCircle, BookOpen, RotateCcw, FileText, MessageSquareQuote } from 'lucide-react';

// Templates de productividad y redacción digital
const EJEMPLOS_TEXTO = [
  {
    titulo: "📧 Responder Email Difícil",
    datos: {
      tipoFormato: "Respuesta de Email",
      contextoOriginal: "El cliente me escribió muy molesto diciendo que la entrega de la web se atrasó 2 días y amenaza con pedir reembolso.",
      objetivo: "Pedir disculpas, explicar que el retraso fue por una caída del servidor externo y ofrecerle un mes de mantenimiento gratis para calmarlo.",
      tono: "Profesional, empático y resolutivo",
      restricciones: "Directo al grano, sin excusas largas. Máximo 3 párrafos."
    }
  },
  {
    titulo: "💼 Post de LinkedIn (Logro)",
    datos: {
      tipoFormato: "Post de LinkedIn",
      contextoOriginal: "Terminamos el desarrollo de un SaaS para inmobiliarias después de 6 meses de trabajo duro con React y Node.js.",
      objetivo: "Compartir el aprendizaje del proceso, agradecer al equipo y mostrar autoridad técnica.",
      tono: "Inspirador, humilde y profesional",
      restricciones: "Usar espacios en blanco para lectura rápida. Terminar con una pregunta para generar comentarios."
    }
  },
  {
    titulo: "🔍 Artículo de Blog (SEO)",
    datos: {
      tipoFormato: "Artículo de Blog optimizado para SEO",
      contextoOriginal: "Escribir sobre 'Las mejores impresoras 3D para principiantes en 2026'.",
      objetivo: "Posicionar en Google. Educar al usuario sobre qué características mirar (cama caliente, nivelación automática) y recomendar 3 modelos.",
      tono: "Educativo, claro y experto",
      restricciones: "Estructura con H1, H2 y H3. Incluir palabras clave: 'impresión 3D', 'PLA', 'extrusor'. Párrafos cortos."
    }
  }
];

const ESTADO_INICIAL = {
  tipoFormato: '',
  contextoOriginal: '',
  objetivo: '',
  tono: '',
  restricciones: ''
};

export default function Texto() {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [copiado, setCopiado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const promptGenerado = useMemo(() => {
    const { tipoFormato, contextoOriginal, objetivo, tono, restricciones } = formulario;
    
    if (!tipoFormato || !objetivo.trim()) return '';

    const partes = [];
    partes.push(`Actúa como un experto en redacción digital y comunicación corporativa.\n`);
    
    partes.push(`[TAREA]`);
    partes.push(`Tu objetivo es redactar: ${tipoFormato}\n`);

    if (contextoOriginal.trim()) {
      partes.push(`[CONTEXTO / TEXTO ORIGINAL]`);
      partes.push(`Ten en cuenta la siguiente información o mensaje al que debes responder:`);
      partes.push(`"${contextoOriginal.trim()}"\n`);
    }
    
    partes.push(`[OBJETIVO DEL TEXTO]`);
    partes.push(`- El texto debe lograr lo siguiente: ${objetivo.trim()}\n`);

    if (tono.trim() || restricciones.trim()) {
      partes.push(`[REGLAS DE ESTILO]`);
      if (tono.trim()) partes.push(`- Tono de voz: ${tono}`);
      if (restricciones.trim()) partes.push(`- Restricciones y formato: ${restricciones}`);
    }

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
        
        {/* Cabecera Estilo Consola */}
        <Box sx={{ bgcolor: '#020617', p: 3, color: 'white', borderBottom: '1px solid #1e293b' }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 'bold', fontFamily: 'monospace' }}>
            <FileText color="#f59e0b" /> Text_Copilot_CLI
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1 }}>
            Generá respuestas a emails, posts SEO, comunicados o mensajes complejos en segundos.
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          {/* Zona de Ejemplos Rápida */}
          <Box sx={{ mb: 4, p: 2.5, bgcolor: '#1e293b', borderRadius: 2, border: '1px solid #334155' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#cbd5e1', fontWeight: 'bold' }}>
                <BookOpen size={16} color="#f59e0b" /> Cargar Casos de Uso Frecuentes
              </Typography>
              <Button 
                size="small" 
                onClick={() => setFormulario(ESTADO_INICIAL)} 
                startIcon={<RotateCcw size={14} />} 
                sx={{ color: '#ef4444', textTransform: 'none' }}
              >
                Limpiar Editor
              </Button>
            </Box>
            <Grid container spacing={1.5}>
              {EJEMPLOS_TEXTO.map((ej, idx) => (
                <Grid item key={idx}>
                  <Chip 
                    label={ej.titulo} 
                    onClick={() => setFormulario(ej.datos)}
                    sx={{ 
                      bgcolor: '#0f172a', 
                      color: '#e2e8f0', 
                      border: '1px solid #475569',
                      '&:hover': { bgcolor: '#b45309', borderColor: '#f59e0b', color: 'white' } 
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Grid container spacing={4}>
            {/* Columna de Formulario Oscuro */}
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex', flexDirection: 'column', gap: 2.5,
                '& .MuiTextField-root': {
                  '& label': { color: '#94a3b8' },
                  '& label.Mui-focused': { color: '#f59e0b' },
                  '& .MuiOutlinedInput-root': {
                    color: '#f8fafc',
                    bgcolor: '#1e293b',
                    '& fieldset': { borderColor: '#334155' },
                    '&:hover fieldset': { borderColor: '#475569' },
                    '&.Mui-focused fieldset': { borderColor: '#f59e0b' },
                  }
                }
              }}>
                <TextField 
                  select
                  label="1. ¿Qué querés escribir o responder?" 
                  name="tipoFormato" 
                  value={formulario.tipoFormato} 
                  onChange={handleChange} 
                  fullWidth 
                  size="small"
                >
                  <MenuItem value="Respuesta de Email">📧 Respuesta de Email</MenuItem>
                  <MenuItem value="Mensaje de Slack/Teams/WhatsApp">💬 Mensaje de Trabajo (Slack/Teams)</MenuItem>
                  <MenuItem value="Post de LinkedIn">💼 Post de LinkedIn</MenuItem>
                  <MenuItem value="Hilo de Twitter/X">🧵 Hilo de Twitter/X</MenuItem>
                  <MenuItem value="Artículo de Blog optimizado para SEO">🔍 Artículo de Blog (SEO)</MenuItem>
                  <MenuItem value="Guion o Texto para TikTok/Instagram">📱 Texto para Instagram / TikTok</MenuItem>
                </TextField>

                <TextField 
                  label="2. Contexto o Texto Original (Pegá el email o tema aquí)" 
                  name="contextoOriginal" 
                  value={formulario.contextoOriginal} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline 
                  minRows={3} 
                  placeholder="Ej: Pegá acá el correo que te mandó tu cliente, o escribí de qué querés que trate el post..." 
                />
                
                <TextField 
                  label="3. ¿Qué querés lograr? (Objetivo)" 
                  name="objetivo" 
                  value={formulario.objetivo} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline 
                  minRows={2} 
                  placeholder="Ej: Rechazar la oferta amablemente, convencerlos de comprar, explicar un problema..." 
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={5}>
                    <TextField 
                      label="4. Tono de voz" 
                      name="tono" 
                      value={formulario.tono} 
                      onChange={handleChange} 
                      fullWidth 
                      size="small" 
                      placeholder="Ej: Formal, cercano, directo..." 
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <TextField 
                      label="5. Restricciones (Largo, Keywords, Formato)" 
                      name="restricciones" 
                      value={formulario.restricciones} 
                      onChange={handleChange} 
                      fullWidth 
                      size="small" 
                      placeholder="Ej: Máximo 2 párrafos, incluir viñetas..." 
                    />
                  </Grid>
                </Grid>
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
                        bgcolor: copiado ? '#10b981' : '#f59e0b', 
                        textTransform: 'none', 
                        color: copiado ? 'white' : '#000',
                        fontWeight: 'bold',
                        py: 0.5,
                        '&:hover': { bgcolor: copiado ? '#059669' : '#d97706' }
                      }}
                    >
                      {copiado ? 'Copiado' : 'Copiar para ChatGPT / Claude'}
                    </Button>
                  </Box>
                  
                  <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
                    {promptGenerado ? (
                      <Typography component="pre" sx={{ 
                        color: '#fde68a', 
                        fontFamily: "'Fira Code', monospace", 
                        whiteSpace: 'pre-wrap', 
                        fontSize: '0.875rem',
                        lineHeight: 1.6
                      }}>
                        {promptGenerado}
                      </Typography>
                    ) : (
                      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                        <MessageSquareQuote size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
                        <Typography variant="body2" align="center" sx={{ fontFamily: 'monospace' }}>
                          Esperando contexto...<br/>
                          Elegí qué querés escribir para generar el prompt.
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
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>Prompt de Texto copiado al portapapeles 📝</Alert>
      </Snackbar>
    </Container>
  );
}