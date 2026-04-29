import React, { useState, useMemo, useCallback } from 'react';
import { 
  Box, Typography, Button, TextField, Paper, Grid, 
  Chip, Snackbar, Alert, Container, MenuItem 
} from '@mui/material';
import { Copy, Terminal, CheckCircle, BookOpen, RotateCcw, AlertCircle } from 'lucide-react';

// Ejemplos prácticos integrados (ideales para que los usuarios de tu blog prueben)
const EJEMPLOS_CONTENIDO = [
  {
    titulo: "🎵 Lanzamiento Musical (Reel)",
    datos: {
      tipoContenido: "guion_video",
      marca: "Nacho Rodríguez",
      descripcion: "Músico independiente lanzando su nuevo single de pop-rock.",
      plataforma: "Instagram Reels y TikTok",
      tono: "Cercano, enérgico y hype",
      objetivo: "Generar pre-saves en Spotify y comentarios en el video.",
      extras: "Incluir un hook visual en los primeros 3 segundos. El CTA debe dirigir al link en bio."
    }
  },
  {
    titulo: "🖨️ Producto Físico (Post)",
    datos: {
      tipoContenido: "post_redes",
      marca: "Caliber 3D",
      descripcion: "Granja de impresión 3D especializada en soportes para setups gamers y piezas a medida.",
      plataforma: "Instagram y Facebook",
      tono: "Tecnológico, directo y profesional",
      objetivo: "Mostrar la durabilidad del material PETG y concretar ventas por DM.",
      extras: "Contacto: DM o WhatsApp 11-0000-0000. Sumar 3 hashtags técnicos y 2 emojis."
    }
  },
  {
    titulo: "📅 Calendario (Agencia)",
    datos: {
      tipoContenido: "calendario",
      marca: "Pixel Maker",
      descripcion: "Agencia de marketing digital que ayuda a negocios locales a digitalizarse.",
      plataforma: "LinkedIn e Instagram",
      tono: "Educativo, autoridad, B2B",
      objetivo: "Planificar 1 mes de contenido (3 posteos por semana) para captar leads.",
      extras: "Intercalar contenido de valor (tips) con casos de éxito y venta de servicios."
    }
  }
];

const ESTADO_INICIAL = {
  tipoContenido: '',
  marca: '',
  descripcion: '',
  plataforma: '',
  tono: '',
  objetivo: '',
  extras: ''
};

export default function MarketingContenidos() {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [copiado, setCopiado] = useState(false);

  // Handler genérico para todos los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  // Generación dinámica del prompt aplicando las mejores prácticas (Rol, Contexto, Tarea, Reglas)
  const promptGenerado = useMemo(() => {
    const { tipoContenido, marca, descripcion, plataforma, tono, objetivo, extras } = formulario;
    
    if (!tipoContenido || !marca.trim()) return '';

    const partes = [];
    partes.push(`Actúa como un Copywriter Senior y Content Manager experto en redes sociales.\n`);
    
    partes.push(`[CONTEXTO]`);
    partes.push(`- Marca: ${marca}`);
    if (descripcion.trim()) partes.push(`- Qué hacemos: ${descripcion}`);
    if (tono.trim()) partes.push(`- Tono de comunicación: ${tono}`);
    if (plataforma.trim()) partes.push(`- Plataforma objetivo: ${plataforma}\n`);

    partes.push(`[TAREA Y OBJETIVO]`);
    switch (tipoContenido) {
      case 'post_redes':
        partes.push(`Escribe el texto (copy) para una publicación. Redacta 3 variantes: una corta, una media y una larga que cuente una historia (storytelling).`);
        break;
      case 'guion_video':
        partes.push(`Crea un guion detallado para un video corto (Reel/TikTok/Short). Divide el guion en dos columnas: "Audio/Locución" y "Visual (Qué se ve en pantalla)". Incluye un gancho (hook) irrefutable en los primeros 3 segundos.`);
        break;
      case 'calendario':
        partes.push(`Diseña un calendario de contenidos en formato de tabla. Incluye: Día, Pilar de Contenido, Formato (Reel/Carrusel/Foto), Idea Central y CTA (Llamado a la acción).`);
        break;
      case 'ads':
        partes.push(`Redacta 3 variantes de copys persuasivos para anuncios pagados (Meta Ads / Google Ads). Aplica la fórmula AIDA (Atención, Interés, Deseo, Acción) o PAS (Problema, Agitación, Solución).`);
        break;
      default:
        break;
    }
    if (objetivo.trim()) partes.push(`- El objetivo principal de este contenido es: ${objetivo}\n`);

    if (extras.trim()) {
      partes.push(`[RESTRICCIONES Y EXTRAS]`);
      partes.push(`- ${extras}`);
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
        {/* Cabecera Consola */}
        <Box sx={{ bgcolor: '#020617', p: 3, color: 'white', borderBottom: '1px solid #1e293b' }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 'bold', fontFamily: 'monospace' }}>
            <Terminal color="#38bdf8" /> Content_Creator_CLI
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1 }}>
            Generador de prompts estructurados para creación de contenidos, guiones y calendarios.
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          {/* Zona de Ejemplos Rápida */}
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
              {EJEMPLOS_CONTENIDO.map((ej, idx) => (
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
                  select
                  label="1. ¿Qué querés crear?" 
                  name="tipoContenido" 
                  value={formulario.tipoContenido} 
                  onChange={handleChange} 
                  fullWidth 
                  size="small"
                >
                  <MenuItem value="post_redes">📝 Copy para Post (Instagram/LinkedIn)</MenuItem>
                  <MenuItem value="guion_video">🎬 Guion para Video Corto (Reel/TikTok)</MenuItem>
                  <MenuItem value="calendario">📅 Calendario de Contenidos</MenuItem>
                  <MenuItem value="ads">🎯 Copys para Anuncios (Ads)</MenuItem>
                </TextField>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField label="Nombre de Marca" name="marca" value={formulario.marca} onChange={handleChange} fullWidth size="small" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Plataforma" name="plataforma" value={formulario.plataforma} onChange={handleChange} fullWidth size="small" placeholder="Ej: TikTok, LinkedIn" />
                  </Grid>
                </Grid>

                <TextField 
                  label="2. ¿Qué hace la marca o qué producto ofrece?" 
                  name="descripcion" 
                  value={formulario.descripcion} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline 
                  minRows={2} 
                  placeholder="Ej: Vendemos software SaaS para inmobiliarias..." 
                />
                
                <TextField 
                  label="3. Objetivo principal" 
                  name="objetivo" 
                  value={formulario.objetivo} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline 
                  minRows={2} 
                  placeholder="Ej: Conseguir comentarios para enviar link por DM, vender entradas..." 
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField 
                      label="Tono de voz" 
                      name="tono" 
                      value={formulario.tono} 
                      onChange={handleChange} 
                      fullWidth 
                      size="small" 
                      placeholder="Ej: Humorístico, Profesional, Educativo" 
                    />
                  </Grid>
                </Grid>

                <TextField 
                  label="4. Extras (Contactos, CTAs, Restricciones)" 
                  name="extras" 
                  value={formulario.extras} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline 
                  minRows={2}
                  maxRows={4}
                  placeholder="Ej: Agregar link a WhatsApp, usar 3 emojis máximo, no usar lenguaje técnico..." 
                />
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
                           Seleccioná un tipo de contenido para empezar.
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