import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Paper,
  Divider,
  IconButton,
  Chip,
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PercentIcon from '@mui/icons-material/Percent';
import Navbar from '../components/Navbar';
import { api } from '../service/api';

export default function RHMatchPage() {
  const { idVaga } = useParams();
  const navigate = useNavigate();
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dados mockados baseados na imagem
  useEffect(() => {
    const fetchCandidatos = () => {
      setTimeout(() => {
        setCandidatos([
          {
            id: 1,
            nome: 'Sara Castanho',
            profissao: 'Engenheiro de Software',
            fotoPerfil: '',
            compatibilidade: 85
          },
          {
            id: 2,
            nome: 'Carlos Silva',
            profissao: 'Analista de Dados',
            fotoPerfil: '',
            compatibilidade: 85
          },
          {
            id: 3,
            nome: 'Luana Marques',
            profissao: 'Dev FrontEnd',
            fotoPerfil: '',
            compatibilidade: 85
          },
          {
            id: 4,
            nome: 'Jorge Lima',
            profissao: 'Dev BackEnd',
            fotoPerfil: '',
            compatibilidade: 85
          }
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchCandidatos();
  }, [idVaga]);

  const abrirDetalhes = (candidato) => {
    navigate(`/candidato/${candidato.id}`);
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress size={60} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Carregando candidatos...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#EEF3F9', minHeight: '100vh' }}>
    <Navbar isLoggedIn={true} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            GitMatch
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          Engenheiro(a) de Software
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 4 }}>
          Inova Tech
        </Typography>

        <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <List>
            {candidatos.map((candidato) => (
              <React.Fragment key={candidato.id}>
                <ListItem 
                  alignItems="flex-start"
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#f5f5f5' }
                  }}
                  onClick={() => abrirDetalhes(candidato)}
                >
                  <ListItemAvatar>
                    <Avatar 
                      alt={candidato.nome} 
                      src={candidato.fotoPerfil} 
                      sx={{ width: 60, height: 60 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" component="div">
                        {candidato.nome}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {candidato.profissao}
                      </Typography>
                    }
                    sx={{ ml: 2 }}
                  />
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    ml: 2
                  }}>
                    <Chip
                      icon={<PercentIcon />}
                      label={`${candidato.compatibilidade}%`}
                      color="primary"
                      variant="outlined"
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        px: 2
                      }}
                    />
                    <Typography variant="caption" sx={{ mt: 1 }}>
                      compatível
                    </Typography>
                  </Box>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
}