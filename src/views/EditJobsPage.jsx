import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Chip,
  Stack,
  Paper,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navbar from '../components/Navbar';
import { api } from '../service/api';

export default function EditJobScreen() {
  const { idVaga } = useParams();
  const navigate = useNavigate();
  
  // Dados mockados baseados na imagem
  const [formData, setFormData] = useState({
    titulo: 'Consultor de Mercados para Microempresas',
    empresa: 'Inova Tech',
    descricao: 'Estar por dentro das altas do mercado, visando uma melhor interação entre negociante e empresa',
    localizacao: 'Recife-PE',
    turno: 'Matutino',
    habilidades: ['Gestão de Projetos', 'Marketing', 'Comunicação']
  });

  const [techInput, setTechInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addTech = () => {
    const tech = techInput.trim();
    if (tech && !formData.habilidades.includes(tech)) {
      setFormData(prev => ({
        ...prev,
        habilidades: [...prev.habilidades, tech]
      }));
      setTechInput('');
    }
  };

  const removeTech = (techToRemove) => {
    setFormData(prev => ({
      ...prev,
      habilidades: prev.habilidades.filter(tech => tech !== techToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Vaga atualizada:', formData);
    // Simulação de sucesso
    alert('Vaga atualizada com sucesso!');
    navigate('/company-jobs');
  };

  return (
    <Box sx={{ backgroundColor: '#EEF3F9', minHeight: '100vh' }}>
    <Navbar isLoggedIn={true} />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Editar vaga
          </Typography>
        </Box>

        <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Cargo
          </Typography>
          <TextField
            fullWidth
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Empresa
          </Typography>
          <TextField
            fullWidth
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Descrição
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Localização
          </Typography>
          <TextField
            fullWidth
            name="localizacao"
            value={formData.localizacao}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Turno
          </Typography>
          <TextField
            fullWidth
            name="turno"
            value={formData.turno}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Habilidades Necessárias
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              fullWidth
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Digite uma habilidade"
              onKeyPress={(e) => e.key === 'Enter' && addTech()}
              sx={{ mr: 2 }}
            />
            <Button variant="contained" onClick={addTech}>
              Adicionar
            </Button>
          </Box>
          
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {formData.habilidades.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                onDelete={() => removeTech(tech)}
              />
            ))}
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            Editar vaga
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}