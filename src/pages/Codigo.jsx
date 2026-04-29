import React, { useState, useMemo, useCallback } from 'react';
import { TextField } from '@mui/material';
import { Terminal, Code } from 'lucide-react';
import PromptBuilderLayout from '../components/PromptBuilderLayout';

const EJEMPLOS = [
  {
    titulo: '👩‍💻 Code Review',
    datos: {
      rol: 'Senior developer con experiencia en TypeScript y arquitectura limpia.',
      contexto: 'Tengo una función en React que maneja el carrito de compras y creo que tiene problemas de performance.',
      objetivo:
        'Hacé un code review detallado. Identificá errores, sugerí mejoras de performance y reescribí la función aplicando buenas prácticas.',
    },
  },
  {
    titulo: '👥 Oferta Laboral (RRHH)',
    datos: {
      rol: 'Especialista en employer branding.',
      contexto: 'Startup fintech de 60 personas, trabajo remoto. Necesitamos un Product Manager Senior.',
      objetivo:
        'Redactá la descripción del puesto con secciones: Sobre nosotros, El rol, Responsabilidades, Requisitos. Tono cercano, máximo 500 palabras.',
    },
  },
  {
    titulo: '📊 Informe de Gestión',
    datos: {
      rol: 'Analista de gestión senior.',
      contexto: 'Tengo los datos del mes de marzo: ventas, costos e incidencias del equipo.',
      objetivo:
        'Generá un informe estructurado para presentar a gerencia. Usá subtítulos, tablas y listas. Tono formal, máximo 2 páginas.',
    },
  },
];

const ESTADO_INICIAL = { rol: '', contexto: '', objetivo: '' };

export default function Codigo() {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [copiado, setCopiado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const promptGenerado = useMemo(() => {
    const { rol, contexto, objetivo } = formulario;
    if (!objetivo.trim() && !contexto.trim()) return '';

    const partes = [];
    if (rol.trim()) partes.push(`Actuá como: ${rol.trim()}\n`);
    if (contexto.trim()) partes.push(`[CONTEXTO]\n${contexto.trim()}\n`);
    if (objetivo.trim()) partes.push(`[TAREA]\n${objetivo.trim()}`);

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
      titulo="Código y Tareas Profesionales"
      icono={<Code color="#34d399" />}
      color="#34d399"
      outputColor="#a7f3d0"
      descripcion="Generá prompts para code review, documentación, informes o cualquier tarea estructurada."
      ejemplos={EJEMPLOS}
      onReset={() => setFormulario(ESTADO_INICIAL)}
      onCargarEjemplo={setFormulario}
      promptGenerado={promptGenerado}
      copiado={copiado}
      onCopiar={copiarAlPortapapeles}
      onCerrarSnackbar={() => setCopiado(false)}
      textoVacio={'Completá el contexto\ny la tarea para generar el prompt.'}
      iconoVacio={<Terminal size={48} />}
      labelCopiar="Copiar Prompt"
      snackbarMsg="Prompt copiado al portapapeles."
    >
      <TextField
        label="1. ¿Qué perfil debe tener la IA? (opcional)"
        name="rol"
        value={formulario.rol}
        onChange={handleChange}
        fullWidth
        size="small"
        multiline
        minRows={1}
        maxRows={3}
        placeholder="Ej: Sos un senior developer especializado en React — o — Sos un abogado laboral argentino"
      />

      <TextField
        label="2. Contexto o situación actual"
        name="contexto"
        value={formulario.contexto}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={3}
        placeholder="Describí la situación, el proyecto o el problema que necesitás resolver..."
      />

      <TextField
        label="3. ¿Qué necesitás que haga?"
        name="objetivo"
        value={formulario.objetivo}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={3}
        placeholder="Ej: Revisá este código y reescribí la función optimizada — o — Redactá el informe con estas secciones..."
      />
    </PromptBuilderLayout>
  );
}
