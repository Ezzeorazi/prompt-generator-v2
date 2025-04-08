import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', p: 2, mt: 4, textAlign: 'center' }}>
      <Typography variant="body2">
        Hecho con ❤️ — by{' '}
        <a
          href="https://ezequiel-orazi.online"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
        >
          Ezequiel Orazi
        </a>{' '}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}

export default Footer;
