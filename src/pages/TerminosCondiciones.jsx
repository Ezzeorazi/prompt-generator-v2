import { Container, Typography, Box, Link } from '@mui/material';

function TerminosCondiciones() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Términos y Condiciones de Uso
      </Typography>

      <Typography variant="body1" paragraph>
        Bienvenido/a a [Nombre de tu Sitio Web] (en adelante, el "Sitio"). Al acceder y utilizar este Sitio, usted (en adelante, el "Usuario") acepta estar sujeto a los siguientes términos y condiciones (en adelante, los "Términos"). Por favor, léalos cuidadosamente. Si no está de acuerdo con estos Términos, no utilice este Sitio.
      </Typography>

      <Typography variant="h6" gutterBottom>
        1. Uso del Sitio
      </Typography>
      <Typography variant="body1" paragraph>
        El Sitio se proporciona para [propósito principal de tu sitio, por ejemplo, generar prompts de IA]. El Usuario se compromete a utilizar el Sitio de manera responsable y de conformidad con todas las leyes y regulaciones aplicables.
      </Typography>

      <Typography variant="h6" gutterBottom>
        2. Propiedad Intelectual
      </Typography>
      <Typography variant="body1" paragraph>
        Todo el contenido presente en este Sitio, incluyendo, pero no limitado a, texto, gráficos, logotipos, iconos, imágenes, clips de audio, descargas digitales y software, es propiedad de [Tu Nombre/Nombre de tu Organización] o sus licenciantes y está protegido por las leyes de propiedad intelectual aplicables.
      </Typography>
      <Typography variant="body1" paragraph>
        Se concede al Usuario una licencia limitada, no exclusiva e intransferible para acceder y utilizar el Sitio únicamente para sus fines personales y no comerciales. Queda estrictamente prohibida cualquier reproducción, distribución, modificación, exhibición o explotación de cualquier contenido del Sitio sin el consentimiento previo por escrito de [Tu Nombre/Nombre de tu Organización].
      </Typography>

      <Typography variant="h6" gutterBottom>
        3. Limitación de Responsabilidad
      </Typography>
      <Typography variant="body1" paragraph>
        El Sitio se proporciona "tal cual" y "según disponibilidad". [Tu Nombre/Nombre de tu Organización] no garantiza que el Sitio esté libre de errores o interrupciones. En la máxima medida permitida por la ley aplicable, [Tu Nombre/Nombre de tu Organización] no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de usar el Sitio.
      </Typography>

      <Typography variant="h6" gutterBottom>
        4. Enlaces a Terceros
      </Typography>
      <Typography variant="body1" paragraph>
        El Sitio puede contener enlaces a sitios web de terceros. Estos enlaces se proporcionan únicamente para la conveniencia del Usuario y no implican que [Tu Nombre/Nombre de tu Organización] respalde o sea responsable del contenido de dichos sitios web. El acceso a sitios web de terceros es bajo la propia responsabilidad del Usuario.
      </Typography>

      <Typography variant="h6" gutterBottom>
        5. Modificaciones de los Términos
      </Typography>
      <Typography variant="body1" paragraph>
        [Tu Nombre/Nombre de tu Organización] se reserva el derecho de modificar estos Términos en cualquier momento sin previo aviso. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el Sitio. Se recomienda al Usuario revisar periódicamente estos Términos para estar al tanto de cualquier cambio. El uso continuado del Sitio después de la publicación de las modificaciones constituirá la aceptación de los nuevos Términos.
      </Typography>

      <Typography variant="h6" gutterBottom>
        6. Ley Aplicable y Jurisdicción
      </Typography>
      <Typography variant="body1" paragraph>
        Estos Términos se regirán e interpretarán de acuerdo con las leyes de [Tu Provincia/País, por ejemplo, la República Argentina]. Cualquier disputa que surja en relación con estos Términos se someterá a la jurisdicción exclusiva de los tribunales de [Tu Ciudad/Provincia, por ejemplo, la ciudad de Rosario, Provincia de Santa Fe].
      </Typography>

      <Typography variant="h6" gutterBottom>
        7. Contacto
      </Typography>
      <Typography variant="body1">
        Si tiene alguna pregunta sobre estos Términos, puede contactarnos a través de [Tu dirección de correo electrónico o formulario de contacto].
      </Typography>

      <Box mt={4} textAlign="center">
        <Typography variant="caption" color="textSecondary">
          Última actualización: [Fecha de la última actualización]
        </Typography>
      </Box>
    </Container>
  );
}

export default TerminosCondiciones;