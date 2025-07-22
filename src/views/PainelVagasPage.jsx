import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Chip, 
  CircularProgress,
  Alert,
  Container,
  Stack
} from '@mui/material';
import { WorkOutline, ArrowBack } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import { api } from '../service/api';

export default function PainelVagas() {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        setLoading(true);

        const techResponse = await api.get('/vaga/usuario/tecnologias');
        const tecnologias = techResponse.data;

        if (!Array.isArray(tecnologias) || tecnologias.length === 0) {
          setError('Nenhuma tecnologia encontrada no perfil.');
          setVagas([]);
          return;
        }

        const vagasResponse = await api.post('/vaga/buscar', tecnologias);
        const todasVagas = vagasResponse.data;

        const usuarioId = localStorage.getItem('userId');
        const candidaturasResponse = await api.get(`/vaga/usuario/${usuarioId}`);
        const vagasCandidatadas = candidaturasResponse.data;

        const vagasFiltradas = todasVagas.filter(
          vaga => !vagasCandidatadas.includes(vaga.idVaga)
        );

        setVagas(vagasFiltradas.map(vaga => ({
          id: vaga.idVaga,
          titulo: vaga.tituloVaga,
          empresa: vaga.nomeEmpresa,
          habilidades: vaga.tecnologias,
        })));
      } catch (error) {
        console.error('Erro ao buscar vagas:', error);
        setError('Não foi possível carregar as vagas.');
      } finally {
        setLoading(false);
      }
    };

    fetchVagas();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Button 
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ mb: 2 }}
          >
            Voltar
          </Button>
          <Typography variant="h4" component="h1" gutterBottom>
            Painel de Vagas
          </Typography>
        </Box>

        {error && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Stack spacing={3}>
            {vagas.map((vaga) => (
              <Card key={vaga.id} elevation={3} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <WorkOutline color="primary" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {vaga.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {vaga.empresa}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
                    {vaga.habilidades.map((hab, i) => (
                      <Chip 
                        key={i}
                        label={hab}
                        size="small"
                        sx={{ 
                          backgroundColor: 'primary.light', 
                          color: 'primary.contrastText' 
                        }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button 
                      variant="contained"
                      onClick={() => navigate(`/job-match/${vaga.id}`)}
                    >
                      Match
                    </Button>
                    <Button 
                      variant="outlined"
                      onClick={() => navigate(`/detalhes-vaga/${vaga.id}`)}
                    >
                      Ver detalhes
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </>
  );
}