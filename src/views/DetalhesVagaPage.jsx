import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import api from '../service/api';

export default function DetalhesVaga() {
  const { vagaId } = useParams();
  const [vaga, setVaga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVaga = async () => {
      try {
        const response = await api.get(`/vaga/${vagaId}`);
        if (response.status === 200) {
          setVaga(response.data);
        } else {
          setError('Vaga não encontrada');
        }
      } catch (error) {
        console.error('Erro ao buscar vaga:', error);
        setError('Não foi possível carregar os detalhes da vaga.');
      } finally {
        setLoading(false);
      }
    };

    fetchVaga();
  }, [vagaId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
          <CircularProgress color="primary" />
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Alert severity="error">{error}</Alert>
          <Button 
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ mt: 2 }}
          >
            Voltar
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button 
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Voltar
        </Button>

        <Typography variant="h4" component="h1" gutterBottom>
          {vaga.tituloVaga}
        </Typography>

        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemText 
              primary="Empresa" 
              secondary={vaga.nomeEmpresa || 'Não informado'} 
            />
          </ListItem>
          <Divider component="li" />

          <ListItem>
            <ListItemText 
              primary="Área de Atuação" 
              secondary={vaga.areaAtuacao || 'Não informado'} 
            />
          </ListItem>
          <Divider component="li" />

          <ListItem>
            <ListItemText 
              primary="Descrição" 
              secondary={vaga.descricao || 'Não informado'} 
              secondaryTypographyProps={{ whiteSpace: 'pre-line' }}
            />
          </ListItem>
          <Divider component="li" />

          <ListItem>
            <ListItemText 
              primary="Localização" 
              secondary={vaga.localizacao || 'Não informado'} 
            />
          </ListItem>
          <Divider component="li" />

          <ListItem>
            <ListItemText 
              primary="Turno" 
              secondary={vaga.turno || 'Não informado'} 
            />
          </ListItem>
          <Divider component="li" />

          <ListItem>
            <ListItemText 
              primary="Habilidades" 
              secondary={
                vaga.tecnologias?.length > 0 ? (
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {vaga.tecnologias.map((tec, index) => (
                      <li key={index}>{tec}</li>
                    ))}
                  </Box>
                ) : 'Nenhuma tecnologia informada'
              } 
            />
          </ListItem>
          <Divider component="li" />

          <ListItem>
            <ListItemText 
              primary="Data de Criação" 
              secondary={new Date(vaga.dataCriacao).toLocaleString('pt-BR')} 
            />
          </ListItem>
        </List>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button 
            variant="contained"
            onClick={() => navigate(`/job-match/${vaga.idVaga}`)}
          >
            Candidatar-se
          </Button>
        </Box>
      </Container>
    </>
  );
}