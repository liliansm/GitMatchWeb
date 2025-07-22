import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Container,
  Avatar,
  Typography,
  Paper,
  Button,
  Alert
} from '@mui/material';
import Navbar from '../components/Navbar';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

export default function CompanyProfileScreen() {
  const navigate = useNavigate();
  
  // Mock data instead of API call
  const [companyData] = useState({
    nome: 'Inova Tech',
    profissao: 'Soluções digitais inteligentes para PMEs',
    fotoPerfil: 'https://i.imgur.com/V9gTjFh.png',
    bio: 'Inova Tech é uma startup especializada em soluções digitais inteligentes para micro e pequenos negócios. Atuamos com consultoria tecnológica, criação de sistemas personalizados e transformação digital.',
  });

  // Simulating loading state for demonstration
  const [loading] = useState(false);
  const [error] = useState(null);

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
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Profile Header */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              mb: 4,
              textAlign: 'center'
            }}>
              <Avatar
                src={companyData.fotoPerfil}
                sx={{
                  width: 150,
                  height: 150,
                  border: '3px solid #FFF',
                  mb: 3,
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Typography variant="h4" sx={{ 
                fontWeight: 'bold', 
                color: 'primary.main',
                mb: 1
              }}>
                {companyData.nome}
              </Typography>
              <Typography variant="subtitle1" sx={{ 
                color: 'text.secondary',
                mb: 3
              }}>
                {companyData.profissao}
              </Typography>

              <Button
                variant="contained"
                startIcon={<WorkOutlineIcon />}
                onClick={() => navigate('/company-jobs')}
                sx={{
                  borderRadius: '30px',
                  px: 4,
                  py: 1.5,
                  mb: 4,
                }}
              >
                Visualizar vagas
              </Button>
            </Box>

            {/* About Section */}
            <Paper sx={{ 
              width: '100%', 
              p: 4, 
              borderRadius: 2,
              boxShadow: 3
            }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 'bold', 
                mb: 3,
                color: 'primary.main'
              }}>
                Sobre a empresa
              </Typography>
              <Typography variant="body1" sx={{ 
                color: 'text.secondary',
                lineHeight: 1.6
              }}>
                {companyData.bio}
              </Typography>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
}

//consumindo a api
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   CircularProgress,
//   Container,
//   Alert,
//   Button,
//   Avatar,
//   Typography,
//   Paper
// } from '@mui/material';
// import Navbar from '../components/Navbar';
// import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
// import { api } from '../service/api';

// export default function CompanyProfileScreen() {
//   const [companyData, setCompanyData] = useState({
//     nome: 'Carregando...',
//     profissao: '',
//     fotoPerfil: '',
//     bio: '',
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCompanyData = async () => {
//       try {
//         const id = localStorage.getItem('userId');
//         const response = await api.get(`/usuario/usuarios/${id}`);
//         setCompanyData(response.data);
//       } catch (err) {
//         console.error('Error fetching company data:', err);
//         setError('Erro ao carregar dados da empresa');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanyData();
//   }, []);

//   return (
//     <Box sx={{ backgroundColor: '#EEF3F9', minHeight: '100vh' }}>
//       <Navbar isLoggedIn={true} />
      
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//             <CircularProgress size={60} color="primary" />
//           </Box>
//         ) : error ? (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {error}
//           </Alert>
//         ) : (
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             {/* Profile Header */}
//             <Box sx={{ 
//               display: 'flex', 
//               flexDirection: 'column', 
//               alignItems: 'center', 
//               mb: 4,
//               textAlign: 'center'
//             }}>
//               <Avatar
//                 src={companyData.fotoPerfil || 'https://i.imgur.com/V9gTjFh.png'}
//                 sx={{
//                   width: 150,
//                   height: 150,
//                   border: '3px solid #FFF',
//                   mb: 3,
//                   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
//                 }}
//               />
//               <Typography variant="h4" sx={{ 
//                 fontWeight: 'bold', 
//                 color: 'primary.main',
//                 mb: 1
//               }}>
//                 {companyData.nome}
//               </Typography>
//               <Typography variant="subtitle1" sx={{ 
//                 color: 'text.secondary',
//                 mb: 3
//               }}>
//                 {companyData.profissao || 'Slogan não informado'}
//               </Typography>

//               <Button
//                 variant="contained"
//                 startIcon={<WorkOutlineIcon />}
//                 onClick={() => navigate('/company-jobs')}
//                 sx={{
//                   borderRadius: '30px',
//                   px: 4,
//                   py: 1.5,
//                   mb: 4,
//                 }}
//               >
//                 Visualizar vagas
//               </Button>
//             </Box>

//             {/* About Section */}
//             <Paper sx={{ 
//               width: '100%', 
//               p: 4, 
//               borderRadius: 2,
//               boxShadow: 3
//             }}>
//               <Typography variant="h5" sx={{ 
//                 fontWeight: 'bold', 
//                 mb: 3,
//                 color: 'primary.main'
//               }}>
//                 Sobre a empresa
//               </Typography>
//               <Typography variant="body1" sx={{ 
//                 color: 'text.secondary',
//                 lineHeight: 1.6
//               }}>
//                 {companyData.bio || 'Descrição não disponível.'}
//               </Typography>
//             </Paper>
//           </Box>
//         )}
//       </Container>
//     </Box>
//   );
// }