import React, { useState, useMemo, useCallback } from 'react';
import { Box, Typography, TextField, Paper, MenuItem, Divider } from '@mui/material';
import { Wand2, Layers, Paintbrush, Image as ImageIcon, Sparkles } from 'lucide-react';
import PromptBuilderLayout, { SELECT_MENU_PROPS } from '../components/PromptBuilderLayout';

const EJEMPLOS = [
  {
    titulo: '📸 Retrato Cinematográfico',
    datos: {
      modo: 'generar',
      tema: 'Retrato en primer plano de una mujer ciberpunk con cables de neón en el cabello, mirada desafiante, lluvia de fondo.',
      estilo: 'Fotorealismo hiperdetallado, Unreal Engine 5, luz de neón azul y rosa, lente 85mm f/1.8, Bokeh',
      aspecto: '9:16 (Vertical / Reels)',
    },
  },
  {
    titulo: '✏️ Boceto a 3D',
    datos: {
      modo: 'modificar',
      tema: 'Transformar este dibujo a lápiz en un render 3D realista estilo Pixar.',
      estilo: '3D Animation, Disney Pixar style, texturas suaves, studio lighting cálido',
      aspecto: '1:1 (Cuadrado / Post)',
    },
  },
  {
    titulo: '🎨 Logo Minimalista',
    datos: {
      modo: 'generar',
      tema: "Logo minimalista para una cafetería llamada 'Lumina', combinando un grano de café y una bombilla de luz.",
      estilo: 'Vector art, flat design, minimalista, fondo blanco puro, sin sombras',
      aspecto: '1:1 (Cuadrado / Post)',
    },
  },
];

const ESTADO_INICIAL = { modo: 'generar', tema: '', estilo: '', aspecto: '' };

const GUIA_MODELOS = [
  {
    nombre: 'Midjourney',
    color: '#059669',
    bgColor: '#064e3b20',
    desc: 'El mejor para imágenes artísticas y fotorrealismo. Requiere Discord. Lee el parámetro --ar del prompt.',
  },
  {
    nombre: 'Gemini (Google)',
    color: '#2563eb',
    bgColor: '#1e3a8a20',
    desc: 'Ideal para editar imágenes. Subí una foto y usá el modo "Modificar" para cambiar fondos o estilos.',
  },
  {
    nombre: 'ChatGPT / DALL-E',
    color: '#d946ef',
    bgColor: '#701a7520',
    desc: 'El más preciso con las instrucciones. Perfecto cuando el resultado debe incluir texto legible.',
  },
  {
    nombre: 'Canva IA',
    color: '#0d9488',
    bgColor: '#0f766e20',
    desc: 'Para creadores de contenido. Generá íconos, fondos y assets directamente en tu diseño.',
  },
];

export default function Imagen() {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [copiado, setCopiado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const promptGenerado = useMemo(() => {
    const { modo, tema, estilo, aspecto } = formulario;
    if (!tema.trim()) return '';

    const partes = [];

    if (modo === 'modificar') {
      partes.push('[IMAGE-TO-IMAGE]');
      partes.push('Basándote en la imagen adjunta, aplicá los siguientes cambios:');
      partes.push(`"${tema.trim()}"\n`);
    } else {
      partes.push('[TEXT-TO-IMAGE]');
      partes.push('Generá una imagen con la siguiente descripción:');
      partes.push(`"${tema.trim()}"\n`);
    }

    partes.push('[DIRECCIÓN DE ARTE]');
    if (estilo.trim()) partes.push(`- Estilo, iluminación y cámara: ${estilo}`);
    if (aspecto.trim()) {
      const ratio = aspecto.split(' ')[0];
      partes.push(`- Formato: ${aspecto} (--ar ${ratio})`);
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

  const guiaModelos = (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        sx={{ color: '#f8fafc', fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <Sparkles size={20} color="#10b981" /> ¿Dónde pego el prompt? Elegí tu herramienta:
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
          gap: 2,
        }}
      >
        {GUIA_MODELOS.map((m) => (
          <Paper
            key={m.nombre}
            sx={{ p: 2, bgcolor: m.bgColor, border: `1px solid ${m.color}`, borderRadius: 2 }}
          >
            <Typography variant="subtitle2" sx={{ color: m.color, fontWeight: 'bold', mb: 0.5 }}>
              {m.nombre}
            </Typography>
            <Typography variant="body2" sx={{ color: '#cbd5e1', fontSize: '0.8rem', lineHeight: 1.5 }}>
              {m.desc}
            </Typography>
          </Paper>
        ))}
      </Box>
      <Divider sx={{ borderColor: '#334155', mt: 4 }} />
    </Box>
  );

  return (
    <PromptBuilderLayout
      titulo="Generador de Imágenes"
      icono={<ImageIcon color="#10b981" />}
      color="#10b981"
      outputColor="#6ee7b7"
      descripcion="Creá prompts visuales para Midjourney, DALL-E, Canva IA y más."
      ejemplos={EJEMPLOS}
      onReset={() => setFormulario(ESTADO_INICIAL)}
      onCargarEjemplo={setFormulario}
      promptGenerado={promptGenerado}
      copiado={copiado}
      onCopiar={copiarAlPortapapeles}
      onCerrarSnackbar={() => setCopiado(false)}
      textoVacio={'Describí tu imagen\npara ver el prompt generado aquí.'}
      iconoVacio={<Paintbrush size={48} />}
      labelCopiar="Copiar Prompt"
      snackbarMsg="Prompt de imagen copiado. ¡A crear!"
      headerExtra={guiaModelos}
    >
      <TextField
        select
        label="1. ¿Crear imagen nueva o editar una existente?"
        name="modo"
        value={formulario.modo}
        onChange={handleChange}
        fullWidth
        size="small"
        SelectProps={{ MenuProps: SELECT_MENU_PROPS }}
      >
        <MenuItem value="generar">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Wand2 size={16} /> Crear imagen desde cero
          </Box>
        </MenuItem>
        <MenuItem value="modificar">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Layers size={16} /> Modificar imagen que ya tengo
          </Box>
        </MenuItem>
      </TextField>

      <TextField
        label={formulario.modo === 'modificar' ? '2. ¿Qué cambios querés hacer?' : '2. ¿Qué debe aparecer en la imagen?'}
        name="tema"
        value={formulario.tema}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={3}
        placeholder={
          formulario.modo === 'modificar'
            ? 'Ej: Cambiá el fondo por una ciudad futurista y hacé el cielo de color naranja...'
            : 'Ej: Un astronauta tomando café en Marte al atardecer...'
        }
      />

      <TextField
        label="3. Estilo, iluminación, cámara (opcional)"
        name="estilo"
        value={formulario.estilo}
        onChange={handleChange}
        fullWidth
        size="small"
        placeholder="Ej: Acuarela, luz natural suave, plano general — o — Fotorealismo, neón, lente macro"
      />

      <TextField
        select
        label="4. Formato de la imagen"
        name="aspecto"
        value={formulario.aspecto}
        onChange={handleChange}
        fullWidth
        size="small"
        SelectProps={{ MenuProps: SELECT_MENU_PROPS }}
      >
        <MenuItem value="">Sin preferencia</MenuItem>
        <MenuItem value="16:9 (Horizontal / Paisaje)">16:9 — Horizontal (YouTube, Wallpaper)</MenuItem>
        <MenuItem value="9:16 (Vertical / Reels)">9:16 — Vertical (Instagram, TikTok)</MenuItem>
        <MenuItem value="1:1 (Cuadrado / Post)">1:1 — Cuadrado (Post de redes)</MenuItem>
        <MenuItem value="4:5 (Vertical Corto)">4:5 — Vertical corto (Feed Instagram)</MenuItem>
      </TextField>
    </PromptBuilderLayout>
  );
}
