import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Typography, 
  Link,
  Alert,
  Box
} from '@mui/material';
import AuthLayout from '../components/AuthLayout';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default function ResetCodeScreen() {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const validarCodigo = async () => {
    if (!code.trim()) {
      setError('Por favor, digite o código de verificação');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/email/validar-codigo`, { 
        email: email, 
        codigo: code 
      });
      
      console.log('Código validado com sucesso:', response.data);
      navigate('/new-password', { 
        state: { 
          email: email, 
          codigo: code 
        } 
      });
    } catch (error) {
      console.error('Erro ao validar código:', error.response?.data || error.message);
      setError('Código inválido ou expirado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Digite o Código"
      subtitle="Enviamos um código para seu e-mail. Digite-o abaixo para redefinir sua senha."
      button={
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={validarCodigo}
          disabled={loading}
          sx={{
            py: 1.5,
            backgroundColor: '#1d4ed8',
            '&:hover': {
              backgroundColor: '#1e40af',
            },
          }}
        >
          {loading ? 'Verificando...' : 'Verificar código'}
        </Button>
      }
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <TextField
        label="Código de verificação"
        fullWidth
        variant="outlined"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        sx={{ mb: 3 }}
        inputProps={{
          maxLength: 6 // Assumindo que o código tem 6 dígitos
        }}
      />

      <Box textAlign="center" mt={2}>
        <Link
          onClick={() => navigate(-1)}
          color="primary"
          fontWeight="bold"
          sx={{ 
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Voltar
        </Link>
      </Box>
    </AuthLayout>
  );
}