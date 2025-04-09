import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Importa Link de react-router-dom

function Footer() {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', p: 2, mt: 4, textAlign: 'center' }}>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Hecho con ❤️ — by{' '}
        <Link
          href="https://ezequiel-orazi.online"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
        >
          Ezequiel Orazi
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
      <Typography variant="body2">
        <Link component={RouterLink} to="/terminos-y-condiciones" color="inherit" underline="hover">
          Términos y Condiciones
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;