import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Box,
  IconButton,
  Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AuthLayout from '../components/AuthLayout';
import { api } from '../service/api';

export default function UpdatePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await api.put(`/usuario/alterar-senha`, {
        senhaAtual: currentPassword,
        novaSenha: newPassword,
      });

      setSuccess("Senha atualizada com sucesso!");
      setTimeout(() => navigate(-1), 1500); // Volta após 1.5 segundos
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError("Falha ao atualizar a senha. Verifique a senha atual.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => navigate(-1)} sx={{ color: '#1d4ed8' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" color="#1d4ed8" fontWeight="bold">
            Atualizar Senha
          </Typography>
        </Stack>
      </Box>

      <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
        Para sua segurança, confirme sua senha atual antes de atualizar.
      </Typography>

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
        label="Senha atual"
        type="password"
        fullWidth
        variant="outlined"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        sx={{ mb: 2 }}
      />

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

      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={handleUpdatePassword}
        disabled={
          loading || 
          !currentPassword || 
          !newPassword || 
          !confirmPassword || 
          newPassword !== confirmPassword
        }
        sx={{
          py: 1.5,
          backgroundColor: '#1d4ed8',
          '&:hover': {
            backgroundColor: '#1e40af',
          },
          '&:disabled': {
            backgroundColor: '#9bbcf2',
          }
        }}
      >
        {loading ? 'Atualizando...' : 'Atualizar senha'}
      </Button>
    </AuthLayout>
  );
}