import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  CircularProgress,
  Avatar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navbar from '../components/Navbar';
import { api } from '../service/api';

export default function EditCompanyProfilePage() {
  const [companyData] = useState({
    nome: 'Inova Tech',
    profissao: 'Soluções digitais inteligentes para PMEs',
    fotoPerfil: 'https://i.imgur.com/V9gTjFh.png',
    bio: 'Inova Tech é uma startup especializada em soluções digitais inteligentes para micro e pequenos negócios. Atuamos com consultoria tecnológica, criação de sistemas personalizados e transformação digital.',
  });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    bio: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        // Simulando chamada à API
        setTimeout(() => {
          setFormData({
            nome: 'Inova Tech',
            descricao: 'EduardaSilva@gmail.com',
            bio: 'Inova Tech é uma startup especializada em soluções digitais inteligentes para micro e pequenas empresas.'
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Erro ao carregar perfil');
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Simulando chamada à API
      setTimeout(() => {
        setSuccessMessage('Perfil atualizado com sucesso!');
        setLoading(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      }, 1000);
    } catch (err) {
      setError('Erro ao atualizar perfil');
      setLoading(false);
    }
  };

  if (loading && !formData.nome) {
    return (
      <Box sx={{ backgroundColor: '#EEF3F9', minHeight: '100vh' }}>
        <Navbar isLoggedIn={true} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress size={60} color="primary" />
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#EEF3F9', minHeight: '100vh' }}>
      <Navbar isLoggedIn={true} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ArrowBackIcon 
            sx={{ mr: 1, cursor: 'pointer' }} 
            onClick={() => navigate(-1)} 
          />
          <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold' }}>
            Editar perfil
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent:'center', alignItems: 'center'}}>
            <Avatar
            src={companyData.fotoPerfil}
                sx={{
                width: 150,
                height: 150,
                border: '3px solid #FFF',
                mb: 3,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }}
        />
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            p: 4,
            boxShadow: 3
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Nome
          </Typography>

          <TextField
            fullWidth
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Descrição
          </Typography>


          <TextField
            fullWidth
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Bio
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 1,
              fontSize: '1rem'
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Salvar'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}