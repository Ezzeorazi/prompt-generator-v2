import React from 'react';
import {
  Box, Typography, Button, Paper,
  Chip, Snackbar, Alert, Container
} from '@mui/material';
import { Copy, BookOpen, RotateCcw, CheckCircle } from 'lucide-react';

export const SELECT_MENU_PROPS = {
  PaperProps: {
    sx: {
      bgcolor: '#1e293b',
      border: '1px solid #334155',
      '& .MuiMenuItem-root': {
        color: '#cbd5e1',
        fontSize: '0.9rem',
        '&:hover': { bgcolor: '#334155' },
        '&.Mui-selected': { bgcolor: '#0f172a', color: '#f8fafc' },
        '&.Mui-selected:hover': { bgcolor: '#334155' },
      },
    },
  },
};

export default function PromptBuilderLayout({
  titulo,
  icono,
  color = '#38bdf8',
  descripcion,
  ejemplos = [],
  onReset,
  onCargarEjemplo,
  promptGenerado = '',
  copiado,
  onCopiar,
  onCerrarSnackbar,
  textoVacio = 'Completá los campos\npara ver tu prompt aquí.',
  iconoVacio,
  outputColor,
  snackbarMsg = '¡Prompt copiado al portapapeles!',
  labelCopiar = 'Copiar Prompt',
  headerExtra,
  bodyExtra,
  children,
}) {
  const textColor = outputColor || color;

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Paper elevation={4} sx={{ overflow: 'hidden', borderRadius: 2, bgcolor: '#0f172a' }}>

        {/* Cabecera */}
        <Box sx={{ bgcolor: '#020617', p: 3, borderBottom: '1px solid #1e293b' }}>
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              fontWeight: 'bold',
              fontFamily: 'monospace',
              color: '#f8fafc',
            }}
          >
            {icono} {titulo}
          </Typography>
          {descripcion && (
            <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5 }}>
              {descripcion}
            </Typography>
          )}
        </Box>

        <Box sx={{ p: { xs: 2, md: 4 } }}>

          {/* Sección extra sobre el encabezado (guía de modelos, etc.) */}
          {headerExtra}

          {/* Templates de ejemplo */}
          <Box sx={{ mb: 4, p: 2.5, bgcolor: '#1e293b', borderRadius: 2, border: '1px solid #334155' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#cbd5e1', fontWeight: 'bold' }}
              >
                <BookOpen size={16} color={color} /> Ejemplos para comenzar
              </Typography>
              <Button
                size="small"
                onClick={onReset}
                startIcon={<RotateCcw size={14} />}
                sx={{ color: '#ef4444', textTransform: 'none', fontSize: '0.8rem' }}
              >
                Limpiar
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {ejemplos.map((ej, idx) => (
                <Chip
                  key={idx}
                  label={ej.titulo}
                  onClick={() => onCargarEjemplo(ej.datos)}
                  sx={{
                    bgcolor: '#0f172a',
                    color: '#e2e8f0',
                    border: '1px solid #475569',
                    '&:hover': {
                      bgcolor: `${color}25`,
                      borderColor: color,
                      color: '#fff',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Sección extra dentro del body (tips, alertas, etc.) */}
          {bodyExtra}

          {/* Layout: formulario izquierda (60%) + terminal derecha (40%) */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' },
              gap: 4,
              alignItems: 'start',
            }}
          >
            {/* Formulario */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
                '& .MuiTextField-root': {
                  '& label': { color: '#94a3b8' },
                  '& label.Mui-focused': { color },
                  '& .MuiInputBase-input': { color: '#f8fafc' },
                  '& .MuiOutlinedInput-root': {
                    color: '#f8fafc',
                    bgcolor: '#1e293b',
                    '& fieldset': { borderColor: '#334155' },
                    '&:hover fieldset': { borderColor: '#475569' },
                    '&.Mui-focused fieldset': { borderColor: color },
                  },
                  '& .MuiSelect-icon': { color: '#94a3b8' },
                  '& .MuiInputLabel-root': { whiteSpace: 'normal', lineHeight: 1.3 },
                },
              }}
            >
              {children}
            </Box>

            {/* Panel de salida estilo terminal */}
            <Paper
              sx={{
                bgcolor: '#000',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                minHeight: 420,
                border: '1px solid #334155',
                borderRadius: 1,
              }}
            >
                {/* Barra de título de la terminal */}
                <Box
                  sx={{
                    bgcolor: '#1e293b',
                    px: 2,
                    py: 1.5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #334155',
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ef4444' }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#eab308' }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#22c55e' }} />
                  </Box>
                  <Button
                    variant="contained"
                    onClick={onCopiar}
                    disabled={!promptGenerado}
                    startIcon={copiado ? <CheckCircle size={14} /> : <Copy size={14} />}
                    sx={{
                      bgcolor: copiado ? '#10b981' : color,
                      textTransform: 'none',
                      color: '#fff',
                      fontWeight: 'bold',
                      py: 0.5,
                      fontSize: '0.8rem',
                      '&:hover': {
                        bgcolor: copiado ? '#047857' : color,
                        filter: 'brightness(0.85)',
                      },
                      '&.Mui-disabled': { bgcolor: '#1e293b', color: '#475569' },
                    }}
                  >
                    {copiado ? 'Copiado' : labelCopiar}
                  </Button>
                </Box>

                {/* Contenido de la terminal */}
                <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
                  {promptGenerado ? (
                    <Typography
                      component="pre"
                      sx={{
                        color: textColor,
                        fontFamily: "'Fira Code', 'Courier New', monospace",
                        whiteSpace: 'pre-wrap',
                        fontSize: '0.875rem',
                        lineHeight: 1.7,
                        m: 0,
                      }}
                    >
                      {promptGenerado}
                    </Typography>
                  ) : (
                    <Box
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#475569',
                        textAlign: 'center',
                      }}
                    >
                      <Box sx={{ mb: 2, opacity: 0.3 }}>{iconoVacio}</Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'monospace',
                          color: '#475569',
                          lineHeight: 1.8,
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {textoVacio}
                      </Typography>
                    </Box>
                  )}
                </Box>
            </Paper>
          </Box>
        </Box>
      </Paper>

      <Snackbar open={copiado} autoHideDuration={2500} onClose={onCerrarSnackbar}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
