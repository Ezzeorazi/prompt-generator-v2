import React, { useState, useMemo, useCallback } from 'react';
import { Box, TextField, MenuItem, Grid } from '@mui/material';
import { Megaphone, Terminal } from 'lucide-react';
import PromptBuilderLayout, { SELECT_MENU_PROPS } from '../components/PromptBuilderLayout';

const EJEMPLOS = [
  {
    titulo: '🎵 Lanzamiento Musical',
    datos: {
      tipoContenido: 'guion_video',
      marca: 'Nacho Rodríguez',
      plataforma: 'Instagram Reels y TikTok',
      descripcion: 'Músico independiente lanzando su nuevo single de pop-rock.',
      objetivo: 'Generar pre-saves en Spotify y comentarios en el video.',
      tono: 'Cercano, enérgico y con hype. Hook visual en los primeros 3 segundos.',
    },
  },
  {
    titulo: '🖨️ Producto Físico',
    datos: {
      tipoContenido: 'post_redes',
      marca: 'Caliber 3D',
      plataforma: 'Instagram y Facebook',
      descripcion: 'Granja de impresión 3D especializada en soportes para setups gamers.',
      objetivo: 'Mostrar la durabilidad del material PETG y concretar ventas por DM.',
      tono: 'Tecnológico, directo y profesional. Máximo 3 emojis.',
    },
  },
  {
    titulo: '📅 Calendario de Contenidos',
    datos: {
      tipoContenido: 'calendario',
      marca: 'Pixel Maker',
      plataforma: 'LinkedIn e Instagram',
      descripcion: 'Agencia de marketing digital que ayuda a negocios locales a digitalizarse.',
      objetivo: 'Planificar 1 mes (3 posts por semana) para captar leads B2B.',
      tono: 'Educativo, de autoridad. Combinar tips de valor con casos de éxito.',
    },
  },
];

const ESTADO_INICIAL = {
  tipoContenido: '',
  marca: '',
  plataforma: '',
  descripcion: '',
  objetivo: '',
  tono: '',
};

export default function MarketingDigital() {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [copiado, setCopiado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const promptGenerado = useMemo(() => {
    const { tipoContenido, marca, plataforma, descripcion, objetivo, tono } = formulario;
    if (!tipoContenido || !marca.trim()) return '';

    const partes = [];
    partes.push('Actuá como Copywriter y Community Manager experto en redes sociales.\n');
    partes.push('[CONTEXTO]');
    partes.push(`- Marca: ${marca}`);
    if (descripcion.trim()) partes.push(`- Qué hace: ${descripcion}`);
    if (tono.trim()) partes.push(`- Tono de comunicación: ${tono}`);
    if (plataforma.trim()) partes.push(`- Plataforma: ${plataforma}\n`);

    partes.push('[TAREA]');
    switch (tipoContenido) {
      case 'post_redes':
        partes.push(
          'Escribí el copy para una publicación. Generá 3 versiones: corta, media y una con storytelling.'
        );
        break;
      case 'guion_video':
        partes.push(
          'Creá un guion para un video corto (Reel/TikTok). Formato tabla: "Audio/Locución" | "Visual (qué se ve)". Incluí un gancho irresistible en los primeros 3 segundos.'
        );
        break;
      case 'calendario':
        partes.push(
          'Diseñá un calendario de contenidos mensual en tabla: Día | Tipo de post | Formato | Idea central | CTA.'
        );
        break;
      case 'ads':
        partes.push(
          'Redactá 3 anuncios para Meta Ads o Google Ads. Aplicá la fórmula AIDA (Atención, Interés, Deseo, Acción) o PAS (Problema, Agitación, Solución).'
        );
        break;
      default:
        break;
    }

    if (objetivo.trim()) partes.push(`- Objetivo principal: ${objetivo}`);

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
      titulo="Marketing Digital"
      icono={<Megaphone color="#38bdf8" />}
      color="#38bdf8"
      outputColor="#a7f3d0"
      descripcion="Creá posts, guiones de video, calendarios y anuncios listos para usar."
      ejemplos={EJEMPLOS}
      onReset={() => setFormulario(ESTADO_INICIAL)}
      onCargarEjemplo={setFormulario}
      promptGenerado={promptGenerado}
      copiado={copiado}
      onCopiar={copiarAlPortapapeles}
      onCerrarSnackbar={() => setCopiado(false)}
      textoVacio={'Elegí el tipo de contenido\ny completá los datos de tu marca.'}
      iconoVacio={<Terminal size={48} />}
      labelCopiar="Copiar Prompt"
      snackbarMsg="Prompt de marketing copiado."
    >
      <TextField
        select
        label="1. ¿Qué querés crear?"
        name="tipoContenido"
        value={formulario.tipoContenido}
        onChange={handleChange}
        fullWidth
        size="small"
        SelectProps={{ MenuProps: SELECT_MENU_PROPS }}
      >
        <MenuItem value="post_redes">📝 Post para redes sociales</MenuItem>
        <MenuItem value="guion_video">🎬 Guion para Reel o TikTok</MenuItem>
        <MenuItem value="calendario">📅 Calendario de contenidos</MenuItem>
        <MenuItem value="ads">🎯 Anuncios pagados (Ads)</MenuItem>
      </TextField>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Nombre de la marca"
            name="marca"
            value={formulario.marca}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="Ej: Mi Negocio"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Plataforma"
            name="plataforma"
            value={formulario.plataforma}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="Ej: Instagram, TikTok"
          />
        </Grid>
      </Grid>

      <TextField
        label="2. ¿Qué hace o vende la marca?"
        name="descripcion"
        value={formulario.descripcion}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={2}
        placeholder="Ej: Vendemos ropa deportiva sustentable para mujeres de 25 a 40 años..."
      />

      <TextField
        label="3. ¿Qué querés lograr?"
        name="objetivo"
        value={formulario.objetivo}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={2}
        placeholder="Ej: Conseguir comentarios para enviar el link por DM, aumentar seguidores, generar ventas..."
      />

      <TextField
        label="4. Tono de comunicación (opcional)"
        name="tono"
        value={formulario.tono}
        onChange={handleChange}
        fullWidth
        size="small"
        placeholder="Ej: Divertido y cercano — o — Profesional y de autoridad — o — Educativo"
      />
    </PromptBuilderLayout>
  );
}
