import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#020617', borderTop: '1px solid #1e293b', py: 6, mt: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Terminal color="#334155" size={32} style={{ marginBottom: '16px' }} />
        
        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2, fontFamily: 'monospace' }}>
          Construido con <span style={{ color: '#ef4444' }}>♥</span> por{' '}
          <MuiLink
            href="https://ezequiel-orazi.online"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold', '&:hover': { textDecoration: 'underline' } }}
          >
            Ezequiel Orazi
          </MuiLink>
          {' '}— {new Date().getFullYear()}
        </Typography>

        <MuiLink 
          component={RouterLink} 
          to="/terminos-y-condiciones" 
          sx={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none', '&:hover': { color: '#f8fafc' } }}
        >
          [ Términos y Condiciones ]
        </MuiLink>
      </Box>
    </Box>
  );
}