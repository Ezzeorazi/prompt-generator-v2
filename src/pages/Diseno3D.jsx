import React, { useState, useMemo, useCallback } from 'react';
import { 
  Box, Typography, Button, TextField, Paper, Grid, 
  Chip, Snackbar, Alert, Container 
} from '@mui/material';
import { Copy, Terminal, CheckCircle, BookOpen, RotateCcw, Box as BoxIcon, Cpu } from 'lucide-react';

const EJEMPLOS_3D = [
  {
    titulo: "🤖 Mecha Sci-Fi",
    datos: {
      objeto: "Un robot mecha de combate desgastado por la batalla, estilo bípedo.",
      estilo: "Sci-Fi / Cyberpunk",
      render: "Unreal Engine 5 (Lumen)",
      material: "Metal oxidado, fibra de carbono y emisores de luz de neón azul.",
      iluminacion: "Iluminación volumétrica y luces de contraste dramático.",
      camara: "Plano contrapicado (Low angle) para que luzca imponente."
    }
  },
  {
    titulo: "🧝‍♀️ Prop de Fantasía",
    datos: {
      objeto: "Un báculo mágico druídico flotando sobre un pedestal antiguo.",
      estilo: "Fantasía Oscura / RPG Asset",
      render: "Blender Cycles",
      material: "Madera tallada antigua, cristales brillantes y enredaderas orgánicas.",
      iluminacion: "Iluminación de estudio (Studio Lighting) con luz de acento mágica.",
      camara: "Plano detalle (Close-up) enfocando el cristal."
    }
  },
  {
    titulo: "🏠 Miniatura Isométrica",
    datos: {
      objeto: "Una pequeña habitación de hacker llena de monitores y cables.",
      estilo: "Low Poly / Stylized",
      render: "Octane Render",
      material: "Plástico mate, maderas suaves y pantallas brillantes.",
      iluminacion: "Iluminación Global (GI) suave y brillante.",
      camara: "Vista isométrica 3D clásica."
    }
  }
];

const ESTADO_INICIAL = {
  objeto: '',
  estilo: '',
  render: '',
  material: '',
  iluminacion: '',
  camara: ''
};

export default function Diseno3D() {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [copiado, setCopiado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const promptGenerado = useMemo(() => {
    const { objeto, estilo, render, material, iluminacion, camara } = formulario;
    
    if (!objeto.trim()) return '';

    const partes = [];
    partes.push(`Genera un modelo 3D detallado de: ${objeto.trim()}\n`);
    
    partes.push(`[ESPECIFICACIONES DE DISEÑO]`);
    if (estilo.trim()) partes.push(`- Estilo artístico: ${estilo}`);
    if (material.trim()) partes.push(`- Materiales y Texturas: ${material}`);
    
    partes.push(`\n[RENDER Y CINEMATOGRAFÍA]`);
    if (render.trim()) partes.push(`- Motor de Render: ${render}, 8k resolution, highly detailed, masterpiece.`);
    if (iluminacion.trim()) partes.push(`- Iluminación: ${iluminacion}`);
    if (camara.trim()) partes.push(`- Ángulo de Cámara: ${camara}`);

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
            <Terminal color="#a855f7" /> 3D_Model_Prompt_Engine
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1 }}>
            Construí prompts hiperrealistas o estilizados para Midjourney, Leonardo AI, Meshy o Blender.
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          {/* Zona de Ejemplos Rápida */}
          <Box sx={{ mb: 4, p: 2.5, bgcolor: '#1e293b', borderRadius: 2, border: '1px solid #334155' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#cbd5e1', fontWeight: 'bold' }}>
                <BookOpen size={16} color="#a855f7" /> Cargar Templates Base
              </Typography>
              <Button 
                size="small" 
                onClick={() => setFormulario(ESTADO_INICIAL)} 
                startIcon={<RotateCcw size={14} />} 
                sx={{ color: '#ef4444', textTransform: 'none' }}
              >
                Limpiar Escena
              </Button>
            </Box>
            <Grid container spacing={1.5}>
              {EJEMPLOS_3D.map((ej, idx) => (
                <Grid item key={idx}>
                  <Chip 
                    label={ej.titulo} 
                    onClick={() => setFormulario(ej.datos)}
                    sx={{ 
                      bgcolor: '#0f172a', 
                      color: '#e2e8f0', 
                      border: '1px solid #475569',
                      '&:hover': { bgcolor: '#7e22ce', borderColor: '#a855f7', color: 'white' } 
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* ALERTA: NANO BANANA 2 */}
          <Box sx={{ mb: 4, p: 2.5, bgcolor: '#3b076415', borderRadius: 2, border: '1px dashed #a855f7', display: 'flex', gap: 2 }}>
            <Cpu size={32} color="#a855f7" style={{ flexShrink: 0 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ color: '#d8b4fe', fontWeight: 'bold', mb: 0.5 }}>
                Pro Tip: Integración con "Nano Banana 2" (Gemini 3 Flash Image)
              </Typography>
              <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.6 }}>
                Si usás Gemini con su modelo generador de imágenes de última generación (conocido técnicamente como Nano Banana 2), 
                podés usar este prompt no solo para obtener un render final, sino para pedirle: <strong>"Genera un concept art de este objeto y luego dame una guía paso a paso para modelarlo yo mismo en Fusion 360 o Blender"</strong>. 
                La IA te va a crear el boceto visual de referencia y la lista exacta de herramientas (extrusiones, biselados, booleanas) que necesitás para hacerlo realidad.
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={4}>
            {/* Columna de Formulario Oscuro */}
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex', flexDirection: 'column', gap: 2.5,
                '& .MuiTextField-root': {
                  '& label': { color: '#94a3b8' },
                  '& label.Mui-focused': { color: '#a855f7' },
                  '& .MuiOutlinedInput-root': {
                    color: '#f8fafc',
                    bgcolor: '#1e293b',
                    '& fieldset': { borderColor: '#334155' },
                    '&:hover fieldset': { borderColor: '#475569' },
                    '&.Mui-focused fieldset': { borderColor: '#a855f7' },
                  }
                }
              }}>
                <TextField 
                  label="1. Objeto o Escena Principal" 
                  name="objeto" 
                  value={formulario.objeto} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline 
                  minRows={2} 
                  placeholder="Ej: Un casco de piloto espacial con visor roto..." 
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField 
                      label="2. Estilo" 
                      name="estilo" 
                      value={formulario.estilo} 
                      onChange={handleChange} 
                      fullWidth 
                      size="small" 
                      placeholder="Ej: Realista, Low Poly, Orgánico" 
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField 
                      label="3. Motor de Render" 
                      name="render" 
                      value={formulario.render} 
                      onChange={handleChange} 
                      fullWidth 
                      size="small" 
                      placeholder="Ej: Unreal Engine 5, Octane, V-Ray" 
                    />
                  </Grid>
                </Grid>

                <TextField 
                  label="4. Materiales y Texturas" 
                  name="material" 
                  value={formulario.material} 
                  onChange={handleChange} 
                  fullWidth 
                  multiline 
                  minRows={2} 
                  placeholder="Ej: Metal oxidado, plástico mate, detalles en oro..." 
                />
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField 
                      label="5. Iluminación" 
                      name="iluminacion" 
                      value={formulario.iluminacion} 
                      onChange={handleChange} 
                      fullWidth 
                      size="small" 
                      placeholder="Ej: Luz volumétrica, Studio lighting" 
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField 
                      label="6. Cámara" 
                      name="camara" 
                      value={formulario.camara} 
                      onChange={handleChange} 
                      fullWidth 
                      size="small" 
                      placeholder="Ej: Macro, Isométrico, Plano General" 
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
                        bgcolor: copiado ? '#10b981' : '#9333ea', 
                        textTransform: 'none', 
                        py: 0.5,
                        '&:hover': { bgcolor: copiado ? '#059669' : '#7e22ce' }
                      }}
                    >
                      {copiado ? 'Copiado' : 'Copiar Prompt'}
                    </Button>
                  </Box>
                  
                  <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
                    {promptGenerado ? (
                      <Typography component="pre" sx={{ 
                        color: '#d8b4fe', 
                        fontFamily: "'Fira Code', 'Courier New', monospace", 
                        whiteSpace: 'pre-wrap', 
                        fontSize: '0.875rem',
                        lineHeight: 1.6
                      }}>
                        {promptGenerado}
                      </Typography>
                    ) : (
                      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                        <BoxIcon size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
                        <Typography variant="body2" align="center" sx={{ fontFamily: 'monospace' }}>
                           Iniciando motor de render...<br/>
                           Describe un objeto para generar tu prompt 3D.
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
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>¡Prompt 3D copiado al portapapeles!</Alert>
      </Snackbar>
    </Container>
  );
}