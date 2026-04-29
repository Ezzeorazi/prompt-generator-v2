import React, { useState, useMemo, useCallback } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { Film, Video as VideoIcon, Clapperboard } from 'lucide-react';
import PromptBuilderLayout from '../components/PromptBuilderLayout';

const EJEMPLOS = [
  {
    titulo: '🏎️ Producto Cinematográfico',
    datos: {
      escena: 'Un reloj de lujo sumergido en agua oscura con burbujas ascendentes.',
      estilo: 'Publicidad cinematográfica high-end, macro orbit shot lento, luz dramática lateral, destellos dorados',
      atmosfera: 'Elegante, misterioso, 4k, cámara lenta (slow motion), colores desaturados.',
    },
  },
  {
    titulo: '🌿 Paisaje con Drone',
    datos: {
      escena: 'Un bosque de pinos cubierto por densa niebla al amanecer.',
      estilo: 'Documental / Fotorrealismo, drone fly-through atravesando las copas, rayos de sol filtrándose',
      atmosfera: 'Pacífico, épico, atmósfera cinematográfica, colores suaves y naturales.',
    },
  },
  {
    titulo: '☕ Lifestyle / Food',
    datos: {
      escena: 'Café vertiéndose en una taza con vapor saliendo en primer plano.',
      estilo: 'Minimalista / Redes sociales, tilt down suave siguiendo el flujo del líquido, luz de ventana cálida',
      atmosfera: 'Hogareño, tranquilo, Bokeh desenfocado, colores cálidos.',
    },
  },
];

const ESTADO_INICIAL = { escena: '', estilo: '', atmosfera: '' };

const TIP_STORYBOARD = (
  <Box
    sx={{
      mb: 4,
      p: 2.5,
      bgcolor: '#4c051910',
      borderRadius: 2,
      border: '1px dashed #f43f5e',
      display: 'flex',
      gap: 2,
    }}
  >
    <VideoIcon size={28} color="#f43f5e" style={{ flexShrink: 0, marginTop: 2 }} />
    <Box>
      <Typography variant="subtitle2" sx={{ color: '#fecdd3', fontWeight: 'bold', mb: 0.5 }}>
        Antes de generar el video: creá un storyboard
      </Typography>
      <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.85rem' }}>
        Pegá el prompt en Gemini o ChatGPT y pedile:{' '}
        <strong>"Creame un storyboard de 4 paneles con los planos y ángulos de cámara para este video."</strong>{' '}
        Así visualizás la estructura antes de usar tus créditos en la IA de video.
      </Typography>
    </Box>
  </Box>
);

export default function Video() {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [copiado, setCopiado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const promptGenerado = useMemo(() => {
    const { escena, estilo, atmosfera } = formulario;
    if (!escena.trim()) return '';

    const partes = [];
    partes.push(`Prompt de Video para IA: ${escena.trim()}\n`);
    partes.push('[ESPECIFICACIONES]');
    if (estilo.trim()) partes.push(`- Estilo visual y movimiento de cámara: ${estilo}`);
    if (atmosfera.trim()) partes.push(`- Atmósfera y calidad: ${atmosfera}`);
    partes.push('- Configuración: alta definición, texturas realistas, movimiento fluido.');

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
    <PromptBuilderLayout
      titulo="Generador de Videos con IA"
      icono={<Film color="#f43f5e" />}
      color="#f43f5e"
      outputColor="#fda4af"
      descripcion="Creá guiones técnicos para Runway, Luma AI o Kling AI."
      ejemplos={EJEMPLOS}
      onReset={() => setFormulario(ESTADO_INICIAL)}
      onCargarEjemplo={setFormulario}
      promptGenerado={promptGenerado}
      copiado={copiado}
      onCopiar={copiarAlPortapapeles}
      onCerrarSnackbar={() => setCopiado(false)}
      textoVacio={'Describí una escena\npara generar el prompt de video.'}
      iconoVacio={<Clapperboard size={48} />}
      labelCopiar="Copiar para IA de Video"
      snackbarMsg="Prompt de video copiado."
      bodyExtra={TIP_STORYBOARD}
    >
      <TextField
        label="1. ¿Qué pasa en el video? (escena principal)"
        name="escena"
        value={formulario.escena}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={3}
        placeholder="Ej: Un astronauta caminando por un desierto rojo al atardecer, con tormentas de arena al fondo..."
      />

      <TextField
        label="2. Estilo visual y movimiento de cámara"
        name="estilo"
        value={formulario.estilo}
        onChange={handleChange}
        fullWidth
        size="small"
        placeholder="Ej: Cyberpunk, zoom in lento — o — Documental, drone sobrevolando, luz natural"
      />

      <TextField
        label="3. Atmósfera, mood y calidad"
        name="atmosfera"
        value={formulario.atmosfera}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={2}
        placeholder="Ej: Sombrío y nostálgico, 4k, cámara lenta — o — Alegre, colores vibrantes, energético"
      />
    </PromptBuilderLayout>
  );
}
