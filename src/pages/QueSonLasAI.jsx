import React from 'react';
import { 
  Container, Box, Typography, Paper, Grid, 
  Divider, Button 
} from '@mui/material';
import { 
  Terminal, Bot, Brain, Sparkles, Image as ImageIcon, 
  Code, MessageSquare, Zap, Globe, Info
} from 'lucide-react';

const MODELS_CONFIG = [
  {
    name: 'Claude 3.5 (Anthropic)',
    color: '#d97757',
    icon: <Brain size={24} />,
    desc: 'El modelo más "humano" y preciso. Ideal para razonamiento complejo y seguir instrucciones técnicas al pie de la letra.',
    bestFor: 'Programación, Redacción literaria, Análisis de documentos extensos.',
    link: 'https://claude.ai/'
  },
  {
    name: 'ChatGPT-4o (OpenAI)',
    color: '#10b981',
    icon: <Bot size={24} />,
    desc: 'El más versátil y rápido. Excelente para brainstorming creativo y herramientas multimodales (voz, visión, datos).',
    bestFor: 'Marketing, Análisis de datos, Conversación fluida.',
    link: 'https://chatgpt.com/'
  },
  {
    name: 'Gemini 1.5 (Google)',
    color: '#3b82f6',
    icon: <Zap size={24} />,
    desc: 'Integrado con todo el ecosistema Google. Su gran ventaja es el acceso a información en tiempo real y videos de YouTube.',
    bestFor: 'Investigación actualizada, Planificación de viajes, Ecosistema Docs.',
    link: 'https://gemini.google.com/'
  }
];

const IMAGE_MODELS = [
  { name: 'Midjourney', desc: 'Calidad artística insuperable.', color: '#8b5cf6' },
  { name: 'DALL-E 3', desc: 'Perfecto seguimiento de prompts.', color: '#10b981' },
  { name: 'Stable Diffusion', desc: 'Control total y Open Source.', color: '#f59e0b' }
];

export default function QueSonLasAI() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={10} sx={{ overflow: 'hidden', borderRadius: 3, bgcolor: '#0f172a', border: '1px solid #1e293b' }}>
        
        {/* TOP BAR - VS CODE STYLE */}
        <Box sx={{ bgcolor: '#020617', px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f' }} />
            <Typography variant="caption" sx={{ color: '#64748b', ml: 2, fontFamily: 'monospace' }}>
              src/pages/learning_center.md
            </Typography>
          </Box>
          <Terminal size={18} color="#38bdf8" />
        </Box>

        <Box sx={{ p: { xs: 3, md: 6 } }}>
          
          {/* INTRODUCCIÓN */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h3" sx={{ color: '#f8fafc', fontWeight: 'bold', mb: 2, fontFamily: 'monospace', fontSize: { xs: '1.8rem', md: '3rem' } }}>
              <span style={{ color: '#38bdf8' }}>&gt;</span> ¿Qué es la IA Generativa?
            </Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8', fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8, maxWidth: '800px' }}>
              A diferencia de las IAs tradicionales que solo clasifican datos, las <span style={{ color: '#34d399' }}>Generativas</span> aprenden patrones para crear contenido desde cero. 
              En esta web, te damos las herramientas para que domines el <strong>Prompt Engineering</strong>: el arte de susurrarle a la máquina para obtener resultados profesionales.
            </Typography>
          </Box>

          {/* GRID DE MODELOS DE TEXTO */}
          <Typography variant="h5" sx={{ color: '#f8fafc', mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 'bold', fontSize: { xs: '1.3rem', md: '1.5rem' } }}>
            <MessageSquare color="#38bdf8" /> Modelos de Lenguaje (LLMs)
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {MODELS_CONFIG.map((model) => (
              // Agregado display: 'flex' acá para evitar superposición
              <Grid item xs={12} md={4} key={model.name} sx={{ display: 'flex' }}>
                <Paper sx={{ 
                  width: '100%', // Cambiado de height: 100% a width: 100%
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: '#1e293b', border: `1px solid #334155`, 
                  p: 3, transition: '0.3s', '&:hover': { borderColor: model.color, transform: 'translateY(-5px)' } 
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, color: model.color }}>
                    {model.icon}
                    <Typography variant="h6" fontWeight="bold" color="white">{model.name}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#cbd5e1', mb: 2, flexGrow: 1 }}>
                    {model.desc}
                  </Typography>
                  <Divider sx={{ borderColor: '#334155', my: 2 }} />
                  <Typography variant="caption" sx={{ color: model.color, fontWeight: 'bold', display: 'block', mb: 2 }}>
                    TOP USO: {model.bestFor}
                  </Typography>
                  <Button 
                    fullWidth variant="outlined" 
                    href={model.link} target="_blank"
                    sx={{ borderColor: '#334155', color: 'white', '&:hover': { borderColor: model.color, bgcolor: `${model.color}10` } }}
                  >
                    Probar Modelo
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* SECCIÓN IMÁGENES & MULTIMEDIA */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Typography variant="h5" sx={{ color: '#f8fafc', mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 'bold', fontSize: { xs: '1.3rem', md: '1.5rem' } }}>
                <ImageIcon color="#a78bfa" /> Generación Visual
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {IMAGE_MODELS.map(img => (
                  <Paper key={img.name} sx={{ p: 2, bgcolor: '#020617', border: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: img.color, fontWeight: 'bold' }}>{img.name}</Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>{img.desc}</Typography>
                    </Box>
                    <Sparkles size={18} color={img.color} />
                  </Paper>
                ))}
              </Box>
            </Grid>

            {/* INFO EXTRA / VERSIONES */}
            <Grid item xs={12} md={5} sx={{ display: 'flex' }}>
              <Box sx={{ width: '100%', p: 3, bgcolor: '#0284c715', border: '1px dashed #0284c7', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: 1, mb: 2, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                  <Info size={20} /> Versiones & Costos
                </Typography>
                <Typography variant="body2" sx={{ color: '#cbd5e1', mb: 2, lineHeight: 1.6 }}>
                  Casi todas las IAs operan bajo el modelo <strong>Freemium</strong>:
                </Typography>
                <Box sx={{ color: '#94a3b8', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Code size={16} style={{ marginTop: 3, flexShrink: 0 }} />
                    <span><strong>Gratis:</strong> Acceso a modelos estándar (como GPT-4o mini o Claude Haiku) con límites diarios.</span>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Globe size={16} style={{ marginTop: 3, flexShrink: 0 }} />
                    <span><strong>Plus/Pro:</strong> ~USD 20/mes. Acceso prioritario, modelos más inteligentes y herramientas integradas.</span>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* FOOTER INTERNO */}
          <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid #1e293b', textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#475569', fontFamily: 'monospace' }}>
              // System_Update: 28_Abril_2026 | Build: stable-release-v2
            </Typography>
          </Box>

        </Box>
      </Paper>
    </Container>
  );
}