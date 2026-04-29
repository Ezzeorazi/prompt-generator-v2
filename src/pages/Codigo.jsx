import React, { useState, useMemo, useCallback } from 'react';
import { 
  Box, Typography, Button, TextField, Paper, Grid, 
  Chip, Snackbar, Alert, Container 
} from '@mui/material';
import { Copy, Terminal, CheckCircle, BookOpen, RotateCcw, AlertCircle } from 'lucide-react';

const EJEMPLOS_BLOG = [
  {
    titulo: "👩‍💻 Code Review",
    datos: {
      rol: "Senior developer con experiencia en TypeScript y arquitectura limpia.",
      contexto: "Trabajo en una app con React y necesito revisar una función crítica.",
      objetivo: "Hacé un code review detallado evaluando performance y principios SOLID.",
      formato: "Documento Markdown con código refactorizado.",
      restricciones: "Sé directo. No asumas librerías externas."
    }
  },
  {
    titulo: "👥 Oferta (RRHH)",
    datos: {
      rol: "Especialista en employer branding.",
      contexto: "Startup fintech de 60 personas, remoto-first.",
      objetivo: "Redactar descripción para Product Manager Senior.",
      formato: "Secciones: Sobre nosotros, El rol, Responsabilidades, Requisitos.",
      restricciones: "Tono cercano. Máximo 500 palabras."
    }
  },
  {
    titulo: "📊 Informe (Admin)",
    datos: {
      rol: "Analista de gestión senior.",
      contexto: "Tengo los datos del mes de marzo: ventas, costos, incidencias.",
      objetivo: "Generar informe estructurado para gerencia directiva.",
      formato: "Subtítulos, tablas y listas.",
      restricciones: "Tono formal. Máximo 2 páginas."
    }
  }
];

const ESTADO_INICIAL = {
  rol: '', contexto: '', objetivo: '', formato: '', restricciones: ''
};

export default function GeneradorPromptsBlog() {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [copiado, setCopiado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const promptGenerado = useMemo(() => {
    if (!formulario.objetivo.trim() && !formulario.contexto.trim()) return '';

    const partes = [];
    if (formulario.rol.trim()) partes.push(`Actúa como: ${formulario.rol.trim()}\n`);
    if (formulario.contexto.trim()) partes.push(`[CONTEXTO]\n${formulario.contexto.trim()}\n`);
    if (formulario.objetivo.trim()) partes.push(`[OBJETIVO]\n${formulario.objetivo.trim()}\n`);
    
    if (formulario.formato.trim() || formulario.restricciones.trim()) {
      partes.push(`[REGLAS Y FORMATO]`);
      if (formulario.formato.trim()) partes.push(`- Formato esperado: ${formulario.formato.trim()}`);
      if (formulario.restricciones.trim()) partes.push(`- Restricciones: ${formulario.restricciones.trim()}`);
    }

    return partes.join('\n').trim();
  }, [formulario]);

  const copiarAlPortapapeles = useCallback(async () => {
    if (!promptGenerado) return;
    await navigator.clipboard.writeText(promptGenerado);
    setCopiado(true);
  }, [promptGenerado]);

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Paper elevation={4} sx={{ overflow: 'hidden', borderRadius: 2, bgcolor: '#0f172a' }}>
        {/* Cabecera Consola */}
        <Box sx={{ bgcolor: '#020617', p: 3, color: 'white', borderBottom: '1px solid #1e293b' }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 'bold', fontFamily: 'monospace' }}>
            <Terminal color="#38bdf8" /> Prompt_Builder_CLI
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1 }}>
            Completá los campos o usá un ejemplo para generar un prompt estructurado para Claude o Gemini.
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          {/* Ejemplos Rápida */}
          <Box sx={{ mb: 4, p: 2.5, bgcolor: '#1e293b', borderRadius: 2, border: '1px solid #334155' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#cbd5e1', fontWeight: 'bold' }}>
                <BookOpen size={16} color="#38bdf8" /> Cargar Templates de Ejemplo
              </Typography>
              <Button 
                size="small" 
                onClick={() => setFormulario(ESTADO_INICIAL)} 
                startIcon={<RotateCcw size={14} />} 
                sx={{ color: '#ef4444', textTransform: 'none' }}
              >
                Resetear campos
              </Button>
            </Box>
            <Grid container spacing={1.5}>
              {EJEMPLOS_BLOG.map((ej, idx) => (
                <Grid item key={idx}>
                  <Chip 
                    label={ej.titulo} 
                    onClick={() => setFormulario(ej.datos)}
                    sx={{ 
                      bgcolor: '#0f172a', 
                      color: '#e2e8f0', 
                      border: '1px solid #475569',
                      '&:hover': { bgcolor: '#0284c7', borderColor: '#38bdf8', color: 'white' } 
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
                  '& label.Mui-focused': { color: '#38bdf8' },
                  '& .MuiOutlinedInput-root': {
                    color: '#f8fafc',
                    bgcolor: '#1e293b',
                    '& fieldset': { borderColor: '#334155' },
                    '&:hover fieldset': { borderColor: '#475569' },
                    '&.Mui-focused fieldset': { borderColor: '#38bdf8' },
                  }
                }
              }}>
                <TextField 
                  label="1. Rol" 
                  name="rol" 
                  value={formulario.rol} 
                  onChange={handleChange} 
                  fullWidth 
                  size="small" 
                  placeholder="Ej: Sos un experto en..." 
                  multiline 
                  minRows={1}
                  maxRows={4}
                />
                
                <TextField 
                  label="2. Contexto" 
                  name="contexto" 
                  value={formulario.contexto} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline 
                  minRows={2} 
                  placeholder="Describí tu situación actual..." 
                />
                
                <TextField 
                  label="3. Objetivo Claro" 
                  name="objetivo" 
                  value={formulario.objetivo} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline 
                  minRows={2} 
                  placeholder="¿Qué querés obtener exactamente?" 
                />
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField 
                      label="4. Formato" 
                      name="formato" 
                      value={formulario.formato} 
                      onChange={handleChange} 
                      fullWidth 
                      size="small" 
                      placeholder="Ej: Tabla, Bullets" 
                      multiline 
                      minRows={1}
                      maxRows={4}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField 
                      label="5. Restricciones" 
                      name="restricciones" 
                      value={formulario.restricciones} 
                      onChange={handleChange} 
                      fullWidth 
                      size="small" 
                      placeholder="Ej: Máximo 300 palabras" 
                      multiline 
                      minRows={1}
                      maxRows={4}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Columna de Output Estilo Consola */}
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
                        bgcolor: copiado ? '#10b981' : '#0ea5e9', 
                        textTransform: 'none', 
                        py: 0.5,
                        '&:hover': { bgcolor: copiado ? '#059669' : '#0284c7' }
                      }}
                    >
                      {copiado ? 'Copiado' : 'Copiar Prompt'}
                    </Button>
                  </Box>
                  
                  <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
                    {promptGenerado ? (
                      <Typography component="pre" sx={{ 
                        color: '#a7f3d0', 
                        fontFamily: "'Fira Code', 'Courier New', monospace", 
                        whiteSpace: 'pre-wrap', 
                        fontSize: '0.875rem',
                        lineHeight: 1.6
                      }}>
                        {promptGenerado}
                      </Typography>
                    ) : (
                      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                        <Terminal size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
                        <Typography variant="body2" align="center" sx={{ fontFamily: 'monospace' }}>
                          Esperando inputs del usuario...<br/>
                         Completá los campos de la izquierda para empezar.
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
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>¡Prompt copiado al portapapeles!</Alert>
      </Snackbar>
    </Container>
  );
}