import React, { useState, useMemo, useCallback } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { Box as BoxIcon, Terminal, Cpu } from 'lucide-react';
import PromptBuilderLayout from '../components/PromptBuilderLayout';

const EJEMPLOS = [
  {
    titulo: '🤖 Mecha Sci-Fi',
    datos: {
      objeto: 'Un robot mecha de combate desgastado por la batalla, estilo bípedo.',
      estilo: 'Sci-Fi / Cyberpunk, Unreal Engine 5 con iluminación volumétrica y contraste dramático',
      material: 'Metal oxidado, fibra de carbono y emisores de luz de neón azul.',
      camara: 'Plano desde abajo (low angle) para que luzca imponente.',
    },
  },
  {
    titulo: '🧝‍♀️ Prop de Fantasía',
    datos: {
      objeto: 'Un báculo mágico druídico flotando sobre un pedestal antiguo.',
      estilo: 'Fantasía Oscura / RPG Asset, Blender Cycles con studio lighting y luz de acento mágica',
      material: 'Madera tallada antigua, cristales brillantes y enredaderas orgánicas.',
      camara: 'Plano detalle (close-up) enfocando el cristal.',
    },
  },
  {
    titulo: '🏠 Miniatura Isométrica',
    datos: {
      objeto: 'Una pequeña habitación de hacker llena de monitores y cables.',
      estilo: 'Low Poly / Stylized, Octane Render con iluminación global suave',
      material: 'Plástico mate, maderas suaves y pantallas brillantes.',
      camara: 'Vista isométrica clásica.',
    },
  },
];

const ESTADO_INICIAL = { objeto: '', estilo: '', material: '', camara: '' };

const TIP_3D = (
  <Box
    sx={{
      mb: 4,
      p: 2.5,
      bgcolor: '#3b076410',
      borderRadius: 2,
      border: '1px dashed #a855f7',
      display: 'flex',
      gap: 2,
    }}
  >
    <Cpu size={28} color="#a855f7" style={{ flexShrink: 0, marginTop: 2 }} />
    <Box>
      <Typography variant="subtitle2" sx={{ color: '#d8b4fe', fontWeight: 'bold', mb: 0.5 }}>
        Tip: Obtené también el tutorial de modelado
      </Typography>
      <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.85rem' }}>
        Pegá este prompt en Gemini y agregá:{' '}
        <strong>"Generá un concept art del objeto y dame una guía paso a paso para modelarlo en Blender."</strong>{' '}
        La IA creará el boceto visual y la lista exacta de herramientas que necesitás.
      </Typography>
    </Box>
  </Box>
);

export default function Diseno3D() {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [copiado, setCopiado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const promptGenerado = useMemo(() => {
    const { objeto, estilo, material, camara } = formulario;
    if (!objeto.trim()) return '';

    const partes = [];
    partes.push(`Generá un modelo 3D de: ${objeto.trim()}\n`);
    partes.push('[DISEÑO Y RENDER]');
    if (estilo.trim()) partes.push(`- Estilo y motor de render: ${estilo}`);
    if (material.trim()) partes.push(`- Materiales y texturas: ${material}`);
    if (camara.trim()) partes.push(`- Ángulo de cámara: ${camara}`);
    partes.push('\nCalidad: alta resolución, detalle máximo, iluminación cinematográfica.');

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
      titulo="Diseño y Render 3D"
      icono={<BoxIcon color="#a855f7" />}
      color="#a855f7"
      outputColor="#d8b4fe"
      descripcion="Creá prompts para modelos 3D en Midjourney, Leonardo AI, Meshy o Blender."
      ejemplos={EJEMPLOS}
      onReset={() => setFormulario(ESTADO_INICIAL)}
      onCargarEjemplo={setFormulario}
      promptGenerado={promptGenerado}
      copiado={copiado}
      onCopiar={copiarAlPortapapeles}
      onCerrarSnackbar={() => setCopiado(false)}
      textoVacio={'Describí el objeto\npara generar tu prompt 3D.'}
      iconoVacio={<BoxIcon size={48} />}
      labelCopiar="Copiar Prompt 3D"
      snackbarMsg="Prompt 3D copiado al portapapeles."
      bodyExtra={TIP_3D}
    >
      <TextField
        label="1. ¿Qué objeto o escena querés modelar?"
        name="objeto"
        value={formulario.objeto}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={2}
        placeholder="Ej: Un casco de piloto espacial con visor roto y marcas de batalla..."
      />

      <TextField
        label="2. Estilo artístico y motor de render"
        name="estilo"
        value={formulario.estilo}
        onChange={handleChange}
        fullWidth
        size="small"
        placeholder="Ej: Realista con Unreal Engine 5 — o — Low Poly estilizado con Blender Cycles"
      />

      <TextField
        label="3. Materiales y texturas"
        name="material"
        value={formulario.material}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={2}
        placeholder="Ej: Metal oxidado con detalles en oro, plástico mate, superficies brillantes..."
      />

      <TextField
        label="4. Ángulo de cámara (opcional)"
        name="camara"
        value={formulario.camara}
        onChange={handleChange}
        fullWidth
        size="small"
        placeholder="Ej: Vista frontal, isométrica, plano detalle (close-up), desde abajo..."
      />
    </PromptBuilderLayout>
  );
}
