import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Box
} from '@mui/material';
import AuthLayout from '../components/AuthLayout';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default function NewPasswordScreen() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subtitle, setSubtitle] = useState('Digite a nova senha e confirme para atualizar sua conta.');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
    if (location.state?.codigo) {
      setCode(location.state.codigo);
    }
  }, [location]);

  const alterarSenha = async () => {
    if (newPassword !== confirmPassword) {
      setSubtitle('As senhas não coincidem. Tente novamente.');
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    setSubtitle('Alterando senha, aguarde...');

    try {
      const response = await axios.post(`${API_BASE_URL}/email/trocar-senha`, { 
        email: email, 
        codigo: code, 
        novaSenha: newPassword 
      });
      
      console.log('Senha alterada com sucesso:', response.data);
      setSuccess('Senha alterada com sucesso!');
      setSubtitle('Senha alterada com sucesso!');
      
      // Redireciona para login após 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Erro ao alterar senha:', error.response?.data || error.message);
      setError('Falha ao alterar senha. Verifique o código e tente novamente.');
      setSubtitle('Falha ao alterar senha. Verifique o código e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Nova Senha"
      subtitle={
        <Typography 
          variant="body1" 
          color={subtitle.includes('As senhas não coincidem') ? 'error' : 'textSecondary'}
          textAlign="center"
          sx={{ mb: 3, fontWeight: subtitle.includes('As senhas não coincidem') ? 'bold' : 'normal' }}
        >
          {subtitle}
        </Typography>
      }
      button={
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={alterarSenha}
          disabled={loading}
          sx={{
            py: 1.5,
            backgroundColor: '#1d4ed8',
            '&:hover': {
              backgroundColor: '#1e40af',
            },
          }}
        >
          {loading ? 'Salvando...' : 'Salvar nova senha'}
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
        label="Nova senha"
        type="password"
        fullWidth
        variant="outlined"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Confirmar nova senha"
        type="password"
        fullWidth
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        sx={{ mb: 3 }}
      />
    </AuthLayout>
  );
}