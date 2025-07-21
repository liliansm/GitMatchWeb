import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Container,
  Alert
} from '@mui/material';
import Navbar from '../components/Navbar'; 
import axios from 'axios';
import { API_BASE_URL } from '../config'; 
import { api } from '../service/api';
import ProfileSection from '../components/ProfileSection';

export default function ProfileScreen() {
  const [userData, setUserData] = useState({
    nome: 'Carregando...',
    githubUsername: '',
    profissao: '',
    fotoPerfil: '',
    tecnologias: [],
    bio: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ... restante do código permanece igual ...
  
  return (
    <Box sx={{ backgroundColor: '#EEF3F9', minHeight: '100vh' }}>
      <Navbar isLoggedIn={true} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress size={60} color="primary" />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : (
          <ProfileSection user={userData} />
        )}
      </Container>
    </Box>
  );
}