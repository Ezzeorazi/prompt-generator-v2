import React, { useState, useMemo, useCallback } from 'react';
import { Box, Typography, TextField, MenuItem } from '@mui/material';
import { Music, Headphones, Info } from 'lucide-react';
import PromptBuilderLayout, { SELECT_MENU_PROPS } from '../components/PromptBuilderLayout';

// ─── Ejemplos de referencia ─────────────────────────────────────────────────
const EJEMPLOS = [
  {
    titulo: '🎸 Rock Melancólico',
    datos: {
      tipoCreacion: 'inspiracion',
      genero: 'Alternative rock, post-grunge',
      mood: 'Melancólico, introspectivo, intenso',
      instrumentos: 'Electric guitar with distortion, heavy drums',
      voces: 'masculinas',
      tematica: '',
      tempo: '',
      tonalidad: '',
      instrumento: '',
    },
  },
  {
    titulo: '🎹 Base Lo-fi para Improvisar',
    datos: {
      tipoCreacion: 'instrumental',
      genero: 'Lo-fi hip hop, jazz hop',
      mood: 'Relajado, nostálgico, tranquilo',
      instrumentos: '',
      voces: '',
      tematica: '',
      tempo: 'lento',
      tonalidad: 'C menor',
      instrumento: 'Guitarra eléctrica con reverb',
    },
  },
  {
    titulo: '🌊 Pop Indie (Canción completa)',
    datos: {
      tipoCreacion: 'cancion',
      genero: 'Indie pop, dream pop',
      mood: 'Romántico, esperanzador, emotivo',
      instrumentos: '',
      voces: 'femeninas',
      tematica: 'Una canción sobre el amor que se termina pero los buenos recuerdos que quedan.',
      tempo: '',
      tonalidad: '',
      instrumento: '',
    },
  },
];

const ESTADO_INICIAL = {
  tipoCreacion: '',
  genero: '',
  mood: '',
  instrumentos: '',
  voces: '',
  tematica: '',
  tempo: '',
  tonalidad: '',
  instrumento: '',
};

// ─── Mapeos de valores ──────────────────────────────────────────────────────
const VOCAL_MAP = {
  femeninas: 'female vocals',
  masculinas: 'male vocals',
  corales: 'choir harmonies, layered vocals',
  instrumental_pura: 'instrumental, no vocals, no lyrics',
};

const TEMPO_MAP = {
  lento: '70-85 BPM, slow tempo',
  moderado: '90-110 BPM, mid-tempo',
  rapido: '120-140 BPM, uptempo',
};

// ─── Tip sobre Suno ─────────────────────────────────────────────────────────
const TIP_SUNO = (
  <Box
    sx={{
      mb: 4,
      p: 2.5,
      bgcolor: '#431407' + '18',
      borderRadius: 2,
      border: '1px dashed #f97316',
      display: 'flex',
      gap: 2,
    }}
  >
    <Info size={28} color="#f97316" style={{ flexShrink: 0, marginTop: 2 }} />
    <Box>
      <Typography variant="subtitle2" sx={{ color: '#fed7aa', fontWeight: 'bold', mb: 0.5 }}>
        ¿Cómo se usa este prompt en Suno?
      </Typography>
      <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.85rem' }}>
        Entrá a <strong style={{ color: '#fdba74' }}>suno.com</strong> → hacé clic en{' '}
        <strong>"Create"</strong>.
        {' '}Para <strong>Inspirarme</strong> y <strong>Base instrumental</strong>: pegá el resultado en
        el campo de estilo.{' '}
        Para <strong>Canción completa</strong>: activá el modo{' '}
        <strong>"Custom"</strong> y pegá cada sección por separado (estilo arriba, letras abajo).
      </Typography>
    </Box>
  </Box>
);

// ─── Componente principal ────────────────────────────────────────────────────
export default function Musica() {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [copiado, setCopiado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  // ─── Generación del prompt ────────────────────────────────────────────────
  const promptGenerado = useMemo(() => {
    const { tipoCreacion, genero, mood, instrumentos, voces, tematica, tempo, tonalidad, instrumento } =
      formulario;

    if (!tipoCreacion || !genero.trim()) return '';

    // ── MODO: Inspirarse ──────────────────────────────────────────────────
    if (tipoCreacion === 'inspiracion') {
      const tags = [];
      tags.push(genero.trim());
      if (mood.trim()) tags.push(mood.trim());
      if (instrumentos.trim()) tags.push(instrumentos.trim());
      if (voces && VOCAL_MAP[voces]) tags.push(VOCAL_MAP[voces]);
      // Suno funciona mejor con 4-7 tags específicos
      return tags.join(', ');
    }

    // ── MODO: Base instrumental ───────────────────────────────────────────
    if (tipoCreacion === 'instrumental') {
      const tags = ['instrumental'];
      tags.push(genero.trim());
      if (mood.trim()) tags.push(mood.trim());
      if (TEMPO_MAP[tempo]) tags.push(TEMPO_MAP[tempo]);
      if (tonalidad.trim()) tags.push(`in ${tonalidad.trim()}`);
      if (instrumento.trim()) tags.push(`suitable for ${instrumento.trim()} improvisation`);
      tags.push('no vocals', 'no lyrics', 'backing track', 'loop-friendly');
      return tags.join(', ');
    }

    // ── MODO: Canción completa (Custom Mode de Suno) ──────────────────────
    if (tipoCreacion === 'cancion') {
      const styleTags = [genero.trim(), mood.trim(), VOCAL_MAP[voces] || '']
        .filter(Boolean)
        .join(', ');

      const lines = [];

      lines.push('─── ESTILO  (pegá esto en el campo "Style" de Suno) ───');
      lines.push(styleTags);
      lines.push('');
      lines.push('─── LETRAS  (pegá esto en el campo "Lyrics" de Suno) ───');
      if (tematica.trim()) {
        lines.push(`// Tema: ${tematica.trim()}`);
        lines.push('');
      }
      lines.push('[Intro]');
      lines.push('(intro instrumental — 8 compases)');
      lines.push('');
      lines.push('[Verse 1]');
      lines.push('(primera estrofa — presentá la historia o situación)');
      lines.push('');
      lines.push('[Pre-Chorus]');
      lines.push('(transición hacia el estribillo, subí la tensión)');
      lines.push('');
      lines.push('[Chorus]');
      lines.push('(estribillo — la parte más pegadiza, repetila exactamente)');
      lines.push('');
      lines.push('[Verse 2]');
      lines.push('(segunda estrofa — avanzá la historia con nueva perspectiva)');
      lines.push('');
      lines.push('[Bridge]');
      lines.push('(contraste emocional — girá la perspectiva o el tono)');
      lines.push('');
      lines.push('[Chorus]');
      lines.push('(repetición del estribillo)');
      lines.push('');
      lines.push('[Outro]');
      lines.push('(cierre, fade out o remate final)');

      return lines.join('\n');
    }

    return '';
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

  const esCancion = formulario.tipoCreacion === 'cancion';
  const esInstrumental = formulario.tipoCreacion === 'instrumental';
  const hayTipo = Boolean(formulario.tipoCreacion);

  return (
    <PromptBuilderLayout
      titulo="Música con IA"
      icono={<Music color="#f97316" />}
      color="#f97316"
      outputColor="#fed7aa"
      descripcion="Prompts para Suno AI: explorá sonidos, creá canciones o armá la base perfecta para improvisar."
      ejemplos={EJEMPLOS}
      onReset={() => setFormulario(ESTADO_INICIAL)}
      onCargarEjemplo={setFormulario}
      promptGenerado={promptGenerado}
      copiado={copiado}
      onCopiar={copiarAlPortapapeles}
      onCerrarSnackbar={() => setCopiado(false)}
      textoVacio={'Elegí qué querés crear\npara ver tu prompt de Suno aquí.'}
      iconoVacio={<Headphones size={48} />}
      labelCopiar={esCancion ? 'Copiar (Modo Custom)' : 'Copiar para Suno'}
      snackbarMsg="¡Prompt de música copiado!"
      bodyExtra={TIP_SUNO}
    >
      {/* ── Siempre visible: tipo de creación ────────────────────────────── */}
      <TextField
        select
        label="1. ¿Qué querés crear?"
        name="tipoCreacion"
        value={formulario.tipoCreacion}
        onChange={handleChange}
        fullWidth
        size="small"
        SelectProps={{ MenuProps: SELECT_MENU_PROPS }}
      >
        <MenuItem value="inspiracion">🎲 Inspirarme — explorar un sonido nuevo</MenuItem>
        <MenuItem value="cancion">🎵 Canción completa — con estructura y letra</MenuItem>
        <MenuItem value="instrumental">🎸 Base instrumental — para tocar encima</MenuItem>
      </TextField>

      {/* ── Campos base (visibles cuando hay tipo seleccionado) ──────────── */}
      {hayTipo && (
        <>
          <TextField
            label="2. Género musical"
            name="genero"
            value={formulario.genero}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="Ej: Indie rock, cumbia, jazz fusión, reggaeton, metal, bossa nova..."
          />

          <TextField
            label="3. Vibe o emoción principal"
            name="mood"
            value={formulario.mood}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="Ej: Melancólico y oscuro — o — Enérgico y festivo — o — Relajado y soñador"
          />
        </>
      )}

      {/* ── Campos exclusivos: INSPIRACIÓN ───────────────────────────────── */}
      {formulario.tipoCreacion === 'inspiracion' && (
        <>
          <TextField
            label="4. Instrumentos que querés destacar (opcional)"
            name="instrumentos"
            value={formulario.instrumentos}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="Ej: Rhodes piano, distortion guitar, drum machine, violín..."
          />
          <TextField
            select
            label="5. Tipo de voz (opcional)"
            name="voces"
            value={formulario.voces}
            onChange={handleChange}
            fullWidth
            size="small"
            SelectProps={{ MenuProps: SELECT_MENU_PROPS }}
          >
            <MenuItem value="">Sin preferencia</MenuItem>
            <MenuItem value="femeninas">Voz femenina</MenuItem>
            <MenuItem value="masculinas">Voz masculina</MenuItem>
            <MenuItem value="corales">Coral / Armonías</MenuItem>
            <MenuItem value="instrumental_pura">Sin voces (solo instrumental)</MenuItem>
          </TextField>
        </>
      )}

      {/* ── Campos exclusivos: CANCIÓN COMPLETA ──────────────────────────── */}
      {esCancion && (
        <>
          <TextField
            label="4. ¿De qué trata la canción?"
            name="tematica"
            value={formulario.tematica}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={2}
            placeholder="Ej: Una despedida en un aeropuerto, el primer amor a los 17, superar una traición, el miedo a crecer..."
          />
          <TextField
            select
            label="5. Tipo de voz"
            name="voces"
            value={formulario.voces}
            onChange={handleChange}
            fullWidth
            size="small"
            SelectProps={{ MenuProps: SELECT_MENU_PROPS }}
          >
            <MenuItem value="">Sin preferencia</MenuItem>
            <MenuItem value="femeninas">Voz femenina</MenuItem>
            <MenuItem value="masculinas">Voz masculina</MenuItem>
            <MenuItem value="corales">Coral / Coros y armonías</MenuItem>
          </TextField>
        </>
      )}

      {/* ── Campos exclusivos: BASE INSTRUMENTAL ─────────────────────────── */}
      {esInstrumental && (
        <>
          <TextField
            select
            label="4. Velocidad"
            name="tempo"
            value={formulario.tempo}
            onChange={handleChange}
            fullWidth
            size="small"
            SelectProps={{ MenuProps: SELECT_MENU_PROPS }}
          >
            <MenuItem value="">Sin preferencia</MenuItem>
            <MenuItem value="lento">Lento (70-85 BPM) — baladas, solos expresivos</MenuItem>
            <MenuItem value="moderado">Moderado (90-110 BPM) — blues, jazz, groove</MenuItem>
            <MenuItem value="rapido">Rápido (120-140 BPM) — funk, rock, metal</MenuItem>
          </TextField>

          <TextField
            label="5. Clave o escala (opcional)"
            name="tonalidad"
            value={formulario.tonalidad}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="Ej: A menor, E blues, C mayor, D dórico, G mixolidio..."
          />

          <TextField
            label="6. ¿Con qué instrumento vas a improvisar?"
            name="instrumento"
            value={formulario.instrumento}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="Ej: Guitarra eléctrica, saxo tenor, violín, voz, teclado..."
          />
        </>
      )}
    </PromptBuilderLayout>
  );
}
