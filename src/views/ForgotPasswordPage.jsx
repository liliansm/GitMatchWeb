import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function ForgotPasswordScreen() {
  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const enviarCodigo = async () => {
    if (!email.trim()) {
      setError('Por favor, digite um e-mail válido.');
      return;
    }

    if (isSending) return;

    setIsSending(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post(`${API_BASE_URL}/email/enviar-codigo`, { to: email });
      setSuccess('Código enviado com sucesso!');
      navigate('/reset-code', { state: { email } });
    } catch (err) {
      setError(err.response?.data || 'Erro ao enviar código');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AuthLayout
      title="Recuperar Senha"
      subtitle="Digite o e-mail da sua conta e enviaremos um código de verificação."
      button={
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={enviarCodigo}
          disabled={isSending}
          sx={{
            py: 1.5,
            backgroundColor: '#1d4ed8',
            '&:hover': {
              backgroundColor: '#1e40af',
            },
          }}
        >
          {isSending ? 'Enviando...' : 'Enviar código'}
        </Button>
      }
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <TextField
        label="E-mail"
        type="email"
        fullWidth
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Box textAlign="center" mt={2}>
        <Link
          href="/login"
          color="primary"
          fontWeight="bold"
          sx={{ cursor: 'pointer' }}
        >
          Voltar para login
        </Link>
      </Box>
    </AuthLayout>
  );
}