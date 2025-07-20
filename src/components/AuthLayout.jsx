import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const SplitContainer = styled(Box)({
  display: 'flex',
  height: '100vh',
});

const FormSide = styled(Box)({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
});

const BrandSide = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: '#1d4ed8',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const FormContainer = styled(Box)({
  maxWidth: '400px',
  width: '100%',
});

export default function AuthLayout({ title, subtitle, children, button }) {
  return (
    <SplitContainer>
      <FormSide>
        <FormContainer>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {subtitle}
          </Typography>
          
          <Box component="form" sx={{ mt: 3 }}>
            {children}
          </Box>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            {button}
          </Box>
        </FormContainer>
      </FormSide>
      
        <BrandSide>
        <img 
            src="/logo.png"  
            alt="Logo" 
            style={{ maxWidth: '70%', maxHeight: '70%' }} 
        />
        </BrandSide>
    </SplitContainer>
  );
}