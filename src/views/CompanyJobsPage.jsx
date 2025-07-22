import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  Stack,
  Chip
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Delete,
  AddCircleOutline
} from '@mui/icons-material';
import Navbar from '../components/Navbar';

export default function CompanyJobsPage() {
  const navigate = useNavigate();
  
  // Dados mockados no lugar da API
  const [vagas, setVagas] = useState([
    {
      idVaga: 1,
      titulo: 'Consultor de Mercados para Microempresas',
      empresa: 'Inova Tech',
      habilidades: 'Gestão de Projetos, Marketing, Comunicação'
    },
    {
      idVaga: 2,
      titulo: 'Analista de Dados Jr',
      empresa: 'Inova Tech',
      habilidades: 'SQL, Python, Análise de Dados'
    },
    {
      idVaga: 3,
      titulo: 'Desenvolvedor Front-end',
      empresa: 'Inova Tech',
      habilidades: 'React, JavaScript, CSS'
    }
  ]);

  const handleDelete = (jobId) => {
    // Simula a exclusão sem chamar API
    setVagas(vagas.filter((vaga) => vaga.idVaga !== jobId));
  };

  const handleEdit = (idVaga) => {
    navigate(`/editar-vaga/${idVaga}`);
  };

  const handleNavigateToMatch = (idVaga) => {
    navigate(`/rh-match/${idVaga}`);
  };

  const handleCreateNewJob = () => {
    navigate('/criar-vaga');
  };

  return (
    <Box sx={{ backgroundColor: '#EEF3F9', minHeight: '100vh' }}>
    <Navbar isLoggedIn={true} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Painel De Vagas
          </Typography>
        </Box>

        <Stack spacing={3}>
          {vagas.map((vaga) => (
            <Paper
              key={vaga.idVaga}
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6
                }
              }}
              onClick={() => handleNavigateToMatch(vaga.idVaga)}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {vaga.titulo}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
                    {vaga.empresa}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {vaga.habilidades.split(',').map((skill, index) => (
                      <Chip key={index} label={skill.trim()} />
                    ))}
                  </Box>
                </Box>
                <Box>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(vaga.idVaga);
                    }}
                    sx={{ color: 'primary.main' }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(vaga.idVaga);
                    }}
                    sx={{ color: 'error.main' }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          ))}
        </Stack>

        <Button
          variant="contained"
          startIcon={<AddCircleOutline />}
          onClick={handleCreateNewJob}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            borderRadius: '50px',
            py: 1.5,
            px: 3,
            boxShadow: 3,
            textTransform: 'none',
            fontSize: '1rem'
          }}
        >
          Criar nova vaga
        </Button>
      </Container>
    </Box>
  );
}

// consumindo a api
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Container,
//   Typography,
//   Paper,
//   Button,
//   IconButton,
//   Stack,
//   Chip,
//   Alert,
//   CircularProgress
// } from '@mui/material';
// import {
//   ArrowBack,
//   Edit,
//   Delete,
//   AddCircleOutline
// } from '@mui/icons-material';
// import { api } from '../service/api';

// export default function CompanyJobsPage() {
//   const [vagas, setVagas] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchVagas = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get('/vaga/empresa');
//         setVagas(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Erro ao buscar vagas:', error);
//         setError('Não foi possível carregar as vagas.');
//         setLoading(false);
//       }
//     };

//     fetchVagas();
//   }, []);

//   const handleDelete = async (jobId) => {
//     try {
//       await api.delete(`/vaga/delete/${jobId}`);
//       setVagas(vagas.filter((vaga) => vaga.idVaga !== jobId));
//     } catch (error) {
//       console.error('Erro ao deletar vaga:', error);
//       setError('Não foi possível excluir a vaga.');
//     }
//   };

//   const handleEdit = (idVaga) => {
//     navigate(`/editar-vaga/${idVaga}`);
//   };

//   const handleNavigateToMatch = (idVaga) => {
//     navigate(`/rh-match/${idVaga}`);
//   };

//   const handleCreateNewJob = () => {
//     navigate('/criar-vaga');
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress size={60} />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ backgroundColor: '#EEF3F9', minHeight: '100vh' }}>
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
//           <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
//             <ArrowBack />
//           </IconButton>
//           <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
//             Painel De Vagas
//           </Typography>
//         </Box>

//         {error && (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {error}
//           </Alert>
//         )}

//         <Stack spacing={3}>
//           {vagas.map((vaga) => (
//             <Paper
//               key={vaga.idVaga}
//               elevation={3}
//               sx={{
//                 p: 3,
//                 borderRadius: 2,
//                 cursor: 'pointer',
//                 '&:hover': {
//                   boxShadow: 6
//                 }
//               }}
//               onClick={() => handleNavigateToMatch(vaga.idVaga)}
//             >
//               <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Box>
//                   <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
//                     {vaga.titulo}
//                   </Typography>
//                   <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
//                     {vaga.empresa || 'Inova Tech'}
//                   </Typography>
//                   <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                     {vaga.habilidades?.split(',').map((skill, index) => (
//                       <Chip key={index} label={skill.trim()} />
//                     ))}
//                   </Box>
//                 </Box>
//                 <Box>
//                   <IconButton
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleEdit(vaga.idVaga);
//                     }}
//                     sx={{ color: 'primary.main' }}
//                   >
//                     <Edit />
//                   </IconButton>
//                   <IconButton
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDelete(vaga.idVaga);
//                     }}
//                     sx={{ color: 'error.main' }}
//                   >
//                     <Delete />
//                   </IconButton>
//                 </Box>
//               </Box>
//             </Paper>
//           ))}
//         </Stack>

//         <Button
//           variant="contained"
//           startIcon={<AddCircleOutline />}
//           onClick={handleCreateNewJob}
//           sx={{
//             position: 'fixed',
//             bottom: 32,
//             right: 32,
//             borderRadius: '50px',
//             py: 1.5,
//             px: 3,
//             boxShadow: 3,
//             textTransform: 'none',
//             fontSize: '1rem'
//           }}
//         >
//           Criar nova vaga
//         </Button>
//       </Container>
//     </Box>
//   );
// }