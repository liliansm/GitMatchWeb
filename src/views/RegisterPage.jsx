import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Alert,
  AlertTitle,
  IconButton
} from '@mui/material';
import { GitHub } from '@mui/icons-material';
import AuthLayout from '../components/AuthLayout';
import { cadastrar } from '../service/authService';

export default function RegisterScreen({ history }) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirma: '',
    github: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (name) => (e) => {
    setForm({ ...form, [name]: e.target.value });
  };

  const handleRegister = async () => {
    if (form.senha !== form.confirma) {
      setError('As senhas não coincidem');
      return;
    }

    const payload = {
      nome: form.nome,
      email: form.email,
      senha: form.senha,
      tipoUsuario: 'CANDIDATO',
      githubUsername: form.github,
    };

    try {
      const userData = await cadastrar(payload);
      console.log('Usuário cadastrado:', userData);
      history.push('/login');
    } catch (error) {
      console.error('Erro no cadastro:', error.response?.data || error.message);
      setError('Verifique os dados e tente novamente.');
    }
  };

  const handleGitHubLogin = () => {
    // Implementar lógica de login com GitHub para web
    console.log('GitHub login');
  };

  return (
    <AuthLayout
      title="Olá"
      subtitle="Adicione seus dados"
      button={
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleRegister}
          sx={{
            padding: '12px 54px',
            borderRadius: '6px',
            marginTop: '10px',
            alignSelf: 'center',
          }}
        >
          Criar conta
        </Button>
      }
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          <AlertTitle>Erro</AlertTitle>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        startIcon={<GitHub />}
        onClick={handleGitHubLogin}
        sx={{
          backgroundColor: '#000',
          color: 'white',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '12px',
          '&:hover': {
            backgroundColor: '#333',
          },
        }}
      >
        Entrar com GitHub
      </Button>

      {['nome', 'email', 'senha', 'confirma', 'github'].map((field, idx) => (
        <TextField
          key={idx}
          label={
            field === 'nome'
              ? 'Nome'
              : field === 'email'
              ? 'E-mail'
              : field === 'senha'
              ? 'Senha'
              : field === 'confirma'
              ? 'Confirme sua senha'
              : 'Link do GitHub'
          }
          type={field.includes('senha') ? 'password' : 'text'}
          fullWidth
          variant="outlined"
          value={form[field]}
          onChange={handleChange(field)}
          sx={{ marginBottom: '12px' }}
        />
      ))}

      <Typography variant="body2" sx={{ my: 1 }}>
        Eu li e concordo com os{' '}
        <Link href="#" color="primary" fontWeight="bold">
          termos e políticas
        </Link>{' '}
        de uso e privacidade.
      </Typography>

      <Typography variant="body1" textAlign="center" sx={{ mt: 2 }}>
        Já tem uma conta?{' '}
        <Link
          href="/login"
          color="primary"
          fontWeight="bold"
          sx={{ cursor: 'pointer' }}
        >
          Login
        </Link>
      </Typography>
    </AuthLayout>
  );
}