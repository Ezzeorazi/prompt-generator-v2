import React, { useState, useMemo, useCallback } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { FileText, MessageSquareQuote } from 'lucide-react';
import PromptBuilderLayout, { SELECT_MENU_PROPS } from '../components/PromptBuilderLayout';

const EJEMPLOS = [
  {
    titulo: '📧 Responder Email Difícil',
    datos: {
      tipoFormato: 'Respuesta de Email',
      contextoOriginal:
        'El cliente me escribió muy molesto diciendo que la entrega de la web se atrasó 2 días y amenaza con pedir reembolso.',
      objetivo:
        'Pedir disculpas, explicar que el retraso fue por una caída del servidor externo y ofrecer un mes de mantenimiento gratis.',
      tono: 'Profesional, empático y resolutivo. Máximo 3 párrafos.',
    },
  },
  {
    titulo: '💼 Post de LinkedIn',
    datos: {
      tipoFormato: 'Post de LinkedIn',
      contextoOriginal:
        'Terminamos el desarrollo de un SaaS para inmobiliarias después de 6 meses de trabajo duro con React y Node.js.',
      objetivo: 'Compartir el aprendizaje del proceso, agradecer al equipo y mostrar autoridad técnica.',
      tono: 'Inspirador, humilde y profesional. Terminar con una pregunta para generar comentarios.',
    },
  },
  {
    titulo: '🔍 Artículo de Blog (SEO)',
    datos: {
      tipoFormato: 'Artículo de Blog optimizado para SEO',
      contextoOriginal: 'Las mejores impresoras 3D para principiantes en 2026.',
      objetivo: 'Posicionar en Google. Educar sobre qué características mirar y recomendar 3 modelos.',
      tono: 'Educativo, claro y experto. Párrafos cortos, estructura con subtítulos.',
    },
  },
];

const ESTADO_INICIAL = { tipoFormato: '', contextoOriginal: '', objetivo: '', tono: '' };

export default function Texto() {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [copiado, setCopiado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const promptGenerado = useMemo(() => {
    const { tipoFormato, contextoOriginal, objetivo, tono } = formulario;
    if (!tipoFormato || !objetivo.trim()) return '';

    const partes = [];
    partes.push('Actuá como un experto en redacción y comunicación.\n');
    partes.push(`[TAREA]\nRedactá: ${tipoFormato}\n`);

    if (contextoOriginal.trim()) {
      partes.push(`[CONTEXTO]\n"${contextoOriginal.trim()}"\n`);
    }

    partes.push(`[OBJETIVO]\n${objetivo.trim()}\n`);

    if (tono.trim()) {
      partes.push(`[TONO Y FORMATO]\n${tono}`);
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
    <PromptBuilderLayout
      titulo="Asistente de Textos"
      icono={<FileText color="#f59e0b" />}
      color="#f59e0b"
      outputColor="#fde68a"
      descripcion="Redactá emails, posts, artículos y mensajes profesionales con ayuda de la IA."
      ejemplos={EJEMPLOS}
      onReset={() => setFormulario(ESTADO_INICIAL)}
      onCargarEjemplo={setFormulario}
      promptGenerado={promptGenerado}
      copiado={copiado}
      onCopiar={copiarAlPortapapeles}
      onCerrarSnackbar={() => setCopiado(false)}
      textoVacio={'Elegí qué querés escribir\ny completá los campos para ver el prompt.'}
      iconoVacio={<MessageSquareQuote size={48} />}
      labelCopiar="Copiar para ChatGPT / Claude"
      snackbarMsg="Prompt de texto copiado al portapapeles."
    >
      <TextField
        select
        label="1. ¿Qué querés escribir?"
        name="tipoFormato"
        value={formulario.tipoFormato}
        onChange={handleChange}
        fullWidth
        size="small"
        SelectProps={{ MenuProps: SELECT_MENU_PROPS }}
      >
        <MenuItem value="Respuesta de Email">📧 Respuesta de email</MenuItem>
        <MenuItem value="Mensaje de trabajo (Slack/Teams/WhatsApp)">💬 Mensaje de trabajo</MenuItem>
        <MenuItem value="Post de LinkedIn">💼 Post de LinkedIn</MenuItem>
        <MenuItem value="Hilo de Twitter/X">🧵 Hilo de Twitter / X</MenuItem>
        <MenuItem value="Artículo de Blog optimizado para SEO">🔍 Artículo de blog (SEO)</MenuItem>
        <MenuItem value="Texto para Instagram o TikTok">📱 Texto para Instagram / TikTok</MenuItem>
      </TextField>

      <TextField
        label="2. Contexto o tema principal"
        name="contextoOriginal"
        value={formulario.contextoOriginal}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={3}
        placeholder="Pegá acá el email que recibiste, o contá sobre qué querés que trate el contenido..."
      />

      <TextField
        label="3. ¿Qué querés lograr?"
        name="objetivo"
        value={formulario.objetivo}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={2}
        placeholder="Ej: Rechazar la oferta sin ofender, convencer al cliente de comprar, explicar un retraso..."
      />

      <TextField
        label="4. Tono y formato (opcional)"
        name="tono"
        value={formulario.tono}
        onChange={handleChange}
        fullWidth
        size="small"
        placeholder="Ej: Formal y breve — o — Cercano, máximo 3 párrafos, con lista de puntos"
      />
    </PromptBuilderLayout>
  );
}
