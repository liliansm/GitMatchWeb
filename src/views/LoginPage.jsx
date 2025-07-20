import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
  IconButton,
  Link
} from '@mui/material';
import { GitHub } from '@mui/icons-material';
import AuthLayout from '../components/AuthLayout';
import { login } from '../service/authService';
import { api } from '../service/api';

export default function LoginScreen({ history }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const clientId = 'Ov23liUE5QNMj8m8pOYA';
  const redirectUri = window.location.origin + '/auth/github/callback';

  const handleGitHubLogin = () => {
    setLoading(true);
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user%20user:email&redirect_uri=${redirectUri}`;
  };

  useEffect(() => {
    // Verificar se há um código de retorno do GitHub
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      (async () => {
        setLoading(true);
        try {
          const response = await api.get(`/api/oauth/github/callback?code=${code}`);
          const { usuario } = response.data;

          if (usuario) {
            // Redireciona para a página certa com o usuário
            history.replace(
              usuario.tipoUsuario === 'CANDIDATO' ? '/profile' : '/company-profile',
              { user: usuario }
            );
          } else {
            alert('Erro: Não foi possível autenticar via GitHub');
          }
        } catch (error) {
          console.error('Erro na autenticação GitHub:', error);
          alert('Erro: Falha na autenticação GitHub');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [history]);

  const handleLogin = async () => {
    if (!email || !senha) {
      alert('Erro: Preencha e-mail e senha');
      return;
    }
    setLoading(true);
    try {
      const data = await login({ email, senha });
      console.log('Login bem-sucedido:', data);

      if (data.tipoUsuario === 'CANDIDATO') {
        history.replace('/profile', { user: data });
      } else if (data.tipoUsuario === 'EMPRESA') {
        history.replace('/company-profile', { user: data });
      } else {
        alert('Erro: Tipo de usuário desconhecido');
      }
    } catch (error) {
      alert('Erro: E-mail ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Bem-vindo de volta!"
      subtitle="Entre com seus dados para continuar"
      button={
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleLogin}
          disabled={loading}
          sx={{
            padding: '12px 68px',
            borderRadius: '6px',
            marginTop: '10px',
            alignSelf: 'center',
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
        </Button>
      }
    >
      <Button
        variant="contained"
        startIcon={<GitHub />}
        onClick={handleGitHubLogin}
        disabled={loading}
        sx={{
          backgroundColor: '#000',
          color: 'white',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '18px',
          marginTop: '20px',
          '&:hover': {
            backgroundColor: '#333',
          },
        }}
      >
        Entrar com GitHub
      </Button>

      <TextField
        label="E-mail"
        type="email"
        fullWidth
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        sx={{ marginBottom: '15px' }}
      />

      <TextField
        label="Senha"
        type="password"
        fullWidth
        variant="outlined"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        disabled={loading}
        sx={{ marginBottom: '15px' }}
      />

      <Box textAlign="right" marginBottom="8px">
        <Link
          href="/forgot-password"
          color="#3361B6"
          underline="hover"
          sx={{ cursor: 'pointer' }}
        >
          Esqueceu sua senha?
        </Link>
      </Box>

      <Typography variant="body1" textAlign="center" marginTop="16px">
        Não tem conta?{' '}
        <Link
          href="/register"
          color="#3361B6"
          underline="hover"
          sx={{ cursor: 'pointer' }}
        >
          Cadastre-se
        </Link>
      </Typography>
    </AuthLayout>
  );
}