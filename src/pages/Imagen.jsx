import React, { useState, useMemo, useCallback } from 'react';
import { 
  Box, Typography, Button, TextField, Paper, Grid, 
  Chip, Snackbar, Alert, Container, MenuItem, Divider 
} from '@mui/material';
import { Copy, Terminal, CheckCircle, BookOpen, RotateCcw, Image as ImageIcon, Sparkles, Wand2, Paintbrush, Layers } from 'lucide-react';

// Templates premium para deslumbrar a los usuarios
const EJEMPLOS_IMAGEN = [
  {
    titulo: "📸 Retrato Cinematográfico",
    datos: {
      modo: "generar",
      tema: "Retrato en primer plano de una mujer ciberpunk con cables de neón en el cabello, mirada desafiante, lluvia de fondo.",
      estilo: "Fotorealismo hiperdetallado, Unreal Engine 5",
      iluminacion: "Luz de neón azul y rosa (Cyberpunk lighting), rim light",
      lente: "Lente 85mm, f/1.8, profundidad de campo superficial (Bokeh)",
      aspecto: "9:16 (Vertical)"
    }
  },
  {
    titulo: "✏️ Pasar Boceto a 3D",
    datos: {
      modo: "modificar",
      tema: "Transformar este dibujo a lápiz en un render 3D realista de Pixar.",
      estilo: "3D Animation, Disney Pixar style, texturas suaves",
      iluminacion: "Studio lighting, luz cálida de rebote",
      lente: "Plano general",
      aspecto: "1:1 (Cuadrado)"
    }
  },
  {
    titulo: "🎨 Logo Minimalista",
    datos: {
      modo: "generar",
      tema: "Logo minimalista para una cafetería llamada 'Lumina', combinando un grano de café y una bombilla de luz.",
      estilo: "Vector art, flat design, minimalista, fondo blanco puro",
      iluminacion: "Iluminación plana, sin sombras",
      lente: "Vista frontal 2D",
      aspecto: "1:1 (Cuadrado)"
    }
  }
];

const ESTADO_INICIAL = {
  modo: 'generar', // generar o modificar
  tema: '',
  estilo: '',
  iluminacion: '',
  lente: '',
  aspecto: ''
};

export default function Imagen() {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [copiado, setCopiado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const promptGenerado = useMemo(() => {
    const { modo, tema, estilo, iluminacion, lente, aspecto } = formulario;
    
    if (!tema.trim()) return '';

    const partes = [];
    
    // Switch de Modo: Generar vs Modificar
    if (modo === 'modificar') {
      partes.push(`[ACCIÓN: IMAGE-TO-IMAGE]`);
      partes.push(`Basándote estrictamente en la imagen adjunta, aplica las siguientes modificaciones/transformaciones:`);
      partes.push(`"${tema.trim()}"\n`);
    } else {
      partes.push(`[ACCIÓN: TEXT-TO-IMAGE]`);
      partes.push(`Genera una imagen con la siguiente descripción principal:`);
      partes.push(`"${tema.trim()}"\n`);
    }
    
    partes.push(`[DIRECCIÓN DE ARTE]`);
    if (estilo.trim()) partes.push(`- Estilo Visual: ${estilo}`);
    if (iluminacion.trim()) partes.push(`- Iluminación: ${iluminacion}`);
    if (lente.trim()) partes.push(`- Cámara/Composición: ${lente}`);
    
    // Agregamos el parámetro técnico de ratio para Midjourney, aunque sirve como contexto para las demás
    if (aspecto.trim()) {
      let ratio = aspecto.split(' ')[0]; // Extrae "16:9" de "16:9 (Horizontal)"
      partes.push(`- Relación de aspecto deseada: ${aspecto} (--ar ${ratio})`);
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
            <ImageIcon color="#10b981" /> Image_Gen_Studio_Pro
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1 }}>
            Motor de prompts visuales avanzados. Diseñá desde cero o alterá imágenes existentes.
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          
          {/* SECCIÓN ESTRELLA: GUÍA DE MODELOS IA */}
          <Box sx={{ mb: 5 }}>
            <Typography variant="h6" sx={{ color: '#f8fafc', fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Sparkles size={20} color="#10b981" /> ¿Dónde pego este prompt? Elige tu motor ideal:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, bgcolor: '#064e3b20', border: '1px solid #059669', height: '100%', borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: '#34d399', fontWeight: 'bold', mb: 1 }}>Midjourney</Typography>
                  <Typography variant="body2" sx={{ color: '#cbd5e1', fontSize: '0.8rem' }}>
                    <strong>El Rey del Arte.</strong> Insuperable en fotorealismo, texturas y cinematografía. Requiere Discord. Lee el parámetro <code>--ar</code> del prompt.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, bgcolor: '#1e3a8a20', border: '1px solid #2563eb', height: '100%', borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: '#60a5fa', fontWeight: 'bold', mb: 1 }}>Nano Banana 2 (Gemini)</Typography>
                  <Typography variant="body2" sx={{ color: '#cbd5e1', fontSize: '0.8rem' }}>
                    <strong>La Bestia de la Edición.</strong> Sube una imagen y usa el modo "Modificar". Ideal para cambiar fondos, fusionar imágenes o pedir variaciones de estilo rápido.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, bgcolor: '#701a7520', border: '1px solid #d946ef', height: '100%', borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: '#f472b6', fontWeight: 'bold', mb: 1 }}>ChatGPT (DALL-E 3)</Typography>
                  <Typography variant="body2" sx={{ color: '#cbd5e1', fontSize: '0.8rem' }}>
                    <strong>El Obediente.</strong> Sigue las instrucciones al pie de la letra. Es el mejor si necesitás que la imagen contenga textos legibles (como un logo o cartel).
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, bgcolor: '#0f766e20', border: '1px solid #0d9488', height: '100%', borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: '#2dd4bf', fontWeight: 'bold', mb: 1 }}>Canva Magic Media</Typography>
                  <Typography variant="body2" sx={{ color: '#cbd5e1', fontSize: '0.8rem' }}>
                    <strong>Para Creadores.</strong> Ideal para generar assets, íconos o fondos directamente en tu mesa de trabajo para redes sociales.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ borderColor: '#334155', mb: 4 }} />

          {/* Zona de Ejemplos Rápida */}
          <Box sx={{ mb: 4, p: 2.5, bgcolor: '#1e293b', borderRadius: 2, border: '1px solid #334155' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#cbd5e1', fontWeight: 'bold' }}>
                <BookOpen size={16} color="#10b981" /> Cargar Templates Profesionales
              </Typography>
              <Button 
                size="small" 
                onClick={() => setFormulario(ESTADO_INICIAL)} 
                startIcon={<RotateCcw size={14} />} 
                sx={{ color: '#ef4444', textTransform: 'none' }}
              >
                Limpiar Lienzo
              </Button>
            </Box>
            <Grid container spacing={1.5}>
              {EJEMPLOS_IMAGEN.map((ej, idx) => (
                <Grid item key={idx}>
                  <Chip 
                    label={ej.titulo} 
                    onClick={() => setFormulario(ej.datos)}
                    sx={{ 
                      bgcolor: '#0f172a', 
                      color: '#e2e8f0', 
                      border: '1px solid #475569',
                      '&:hover': { bgcolor: '#064e3b', borderColor: '#10b981', color: 'white' } 
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
                  '& label.Mui-focused': { color: '#10b981' },
                  '& .MuiOutlinedInput-root': {
                    color: '#f8fafc',
                    bgcolor: '#1e293b',
                    '& fieldset': { borderColor: '#334155' },
                    '&:hover fieldset': { borderColor: '#475569' },
                    '&.Mui-focused fieldset': { borderColor: '#10b981' },
                  }
                }
              }}>
                <TextField 
                  select
                  label="1. Modo de Generación" 
                  name="modo" 
                  value={formulario.modo} 
                  onChange={handleChange} 
                  fullWidth 
                  size="small"
                >
                  <MenuItem value="generar"><Wand2 size={16} style={{ marginRight: 8, display:'inline-block', verticalAlign:'middle' }}/> Generar imagen desde cero</MenuItem>
                  <MenuItem value="modificar"><Layers size={16} style={{ marginRight: 8, display:'inline-block', verticalAlign:'middle' }}/> Modificar imagen existente (Sube una foto a la IA)</MenuItem>
                </TextField>

                <TextField 
                  label={formulario.modo === 'modificar' ? "2. ¿Qué le cambiamos a la imagen adjunta?" : "2. Tema / Sujeto Principal"} 
                  name="tema" 
                  value={formulario.tema} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline 
                  minRows={3} 
                  placeholder={formulario.modo === 'modificar' ? "Ej: Cambia el fondo a una ciudad futurista..." : "Ej: Un astronauta tomando café en Marte..."} 
                />
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      label="3. Estilo Artístico" 
                      name="estilo" 
                      value={formulario.estilo} 
                      onChange={handleChange} 
                      fullWidth 
                      size="small" 
                      placeholder="Ej: Pixel art, Fotorealismo, Acuarela..." 
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      select
                      label="4. Aspect Ratio" 
                      name="aspecto" 
                      value={formulario.aspecto} 
                      onChange={handleChange} 
                      fullWidth 
                      size="small"
                    >
                      <MenuItem value="">-- Libre --</MenuItem>
                      <MenuItem value="16:9 (Horizontal / Paisaje)">16:9 (Horizontal / Paisaje)</MenuItem>
                      <MenuItem value="9:16 (Vertical / Reels)">9:16 (Vertical / Reels)</MenuItem>
                      <MenuItem value="1:1 (Cuadrado / Post)">1:1 (Cuadrado / Post)</MenuItem>
                      <MenuItem value="4:5 (Vertical Corto)">4:5 (Vertical Corto)</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      label="5. Iluminación" 
                      name="iluminacion" 
                      value={formulario.iluminacion} 
                      onChange={handleChange} 
                      fullWidth 
                      size="small" 
                      placeholder="Ej: Luz de ventana, Neón, Cinematic..." 
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      label="6. Cámara / Composición" 
                      name="lente" 
                      value={formulario.lente} 
                      onChange={handleChange} 
                      fullWidth 
                      size="small" 
                      placeholder="Ej: Lente 50mm, Vista aérea, Macro..." 
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
                        bgcolor: copiado ? '#10b981' : '#059669', 
                        textTransform: 'none', 
                        color: 'white',
                        fontWeight: 'bold',
                        py: 0.5,
                        '&:hover': { bgcolor: copiado ? '#047857' : '#047857' }
                      }}
                    >
                      {copiado ? 'Copiado' : 'Copiar Prompt Visual'}
                    </Button>
                  </Box>
                  
                  <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
                    {promptGenerado ? (
                      <Typography component="pre" sx={{ 
                        color: '#6ee7b7', 
                        fontFamily: "'Fira Code', monospace", 
                        whiteSpace: 'pre-wrap', 
                        fontSize: '0.875rem',
                        lineHeight: 1.6
                      }}>
                        {promptGenerado}
                      </Typography>
                    ) : (
                      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                        <Paintbrush size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
                        <Typography variant="body2" align="center" sx={{ fontFamily: 'monospace' }}>
                           Lienzo en blanco...<br/>
                           Describí tu idea a la izquierda para armar la magia.
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
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>Prompt de Imagen listo para renderizar 🎨</Alert>
      </Snackbar>
    </Container>
  );
}