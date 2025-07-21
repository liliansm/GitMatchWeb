import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HeroImage from '../assets/img1Home.png'; // Ajuste o caminho conforme necessário

// Substituir por autenticação real (useContext/useAuth)
const isLoggedIn = false; // ← simulação

export default function HomeScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    setMenuOpen(false);
    alert('Você saiu!');
  };

  const handleNavigate = (route) => {
    setMenuOpen(false);
    navigate(route);
  };

  return (
    <Box sx={{ backgroundColor: '#EEF3F9', minHeight: '100vh' }}>
      {/* NAVBAR */}
      <Box sx={{
        height: 60,
        backgroundColor: '#fff',
        px: 3,
        py: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 1
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1d4ed8' }}>
          GitMatch
        </Typography>
        
        <IconButton onClick={() => setMenuOpen(true)}>
          <MenuIcon sx={{ color: '#1d4ed8', fontSize: 28 }} />
        </IconButton>
      </Box>

      {/* MENU HAMBURGUER */}
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <IconButton onClick={() => setMenuOpen(false)} sx={{ mb: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          
          <List>
            {isLoggedIn ? (
              <>
                <ListItem button onClick={() => handleNavigate('/profile')}>
                  <ListItemText primary="Perfil" />
                </ListItem>
                <ListItem button onClick={() => handleNavigate('/vagas')}>
                  <ListItemText primary="Vagas" />
                </ListItem>
                <ListItem button onClick={() => handleNavigate('/notificacoes')}>
                  <ListItemText primary="Notificações" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Sair" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button onClick={() => handleNavigate('/login')}>
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button onClick={() => handleNavigate('/register')}>
                  <ListItemText primary="Cadastrar-se" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>

      {/* CONTEÚDO PRINCIPAL */}
      <Box component="main">
        <HeroSection isLoggedIn={isLoggedIn} />
        <FeaturesSection />
        <TestimonialsSection />
        <FooterGradient />
      </Box>
    </Box>
  );
}

// Componente HeroSection
function HeroSection({ isLoggedIn }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{ 
      px: { xs: 3, md: 10 },
      py: { xs: 4, md: 8 },
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: 'center',
      gap: 4
    }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h3" component="h1" sx={{ 
          fontWeight: 'bold', 
          color: '#0f172a',
          mb: 2,
          textAlign: { xs: 'center', md: 'left' }
        }}>
          Conecte-se com a vaga ideal através do seu GitHub
        </Typography>

        <Typography variant="body1" sx={{ 
          color: '#475569',
          mb: 3,
          textAlign: { xs: 'center', md: 'left' }
        }}>
          O GitMatch analisa suas habilidades e projetos para te recomendar oportunidades com base no seu perfil técnico.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <Feature icon={<GitHubIcon sx={{ color: '#1d4ed8' }} />} label="Análises técnicas automáticas" />
          <Feature icon={<WorkOutlineIcon sx={{ color: '#1d4ed8' }} />} label="Vagas sempre atualizadas" />
          <Feature icon={<PersonOutlineIcon sx={{ color: '#1d4ed8' }} />} label="Conexão com recrutadores reais" />
        </Box>

        <Button
          variant="contained"
          onClick={() => navigate(isLoggedIn ? '/profile' : '/login')}
          sx={{
            backgroundColor: '#1d4ed8',
            borderRadius: '30px',
            px: 4,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#1e40af',
            }
          }}
        >
          {isLoggedIn ? 'Ver Perfil' : 'Entre agora'}
        </Button>
      </Box>

      {isDesktop && (
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img 
            src={HeroImage} 
            alt="GitMatch" 
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
        </Box>
      )}
    </Box>
  );
}

// Componente Feature
function Feature({ icon, label }) {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      backgroundColor: '#f1f5f9',
      p: 2,
      borderRadius: 1
    }}>
      <Box sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: '#e0e7ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </Box>
      <Typography variant="body1" sx={{ color: '#1e293b' }}>
        {label}
      </Typography>
    </Box>
  );
}

// Componente FeaturesSection
function FeaturesSection() {
  return (
    <Box sx={{ 
      px: { xs: 3, md: 10 },
      py: { xs: 4, md: 8 },
      backgroundColor: '#f8fafc'
    }}>
      <Typography variant="h4" component="h2" sx={{ 
        fontWeight: 'bold', 
        color: '#0f172a',
        mb: 1
      }}>
        Como Funciona?
      </Typography>
      <Typography variant="body1" sx={{ 
        color: '#475569',
        mb: 4
      }}>
        Encontre a vaga ideal em apenas 3 passos
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {features.map((item, index) => (
          <Box key={index} sx={{
            backgroundColor: '#ffffff',
            borderRadius: 2,
            p: 3,
            flex: 1,
            boxShadow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            <Box sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: '#e0e7ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {item.icon}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: '600', color: '#1e293b' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569' }}>
              {item.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

const features = [
  {
    icon: <GitHubIcon sx={{ color: '#1d4ed8', fontSize: 24 }} />,
    title: 'Conecte seu GitHub',
    text: 'Crie sua conta usando seu perfil do GitHub e tenha uma análise técnica instantânea.',
  },
  {
    icon: <WorkOutlineIcon sx={{ color: '#1d4ed8', fontSize: 24 }} />,
    title: 'Descubra vagas compatíveis',
    text: 'Receba sugestões de vagas alinhadas com seu perfil e experiências reais.',
  },
  {
    icon: <CheckCircleOutlineIcon sx={{ color: '#1d4ed8', fontSize: 24 }} />,
    title: 'Candidate-se com confiança',
    text: 'Veja seu índice de compatibilidade e envie sua candidatura diretamente.',
  },
];

// Componente TestimonialsSection
function TestimonialsSection() {
  return (
    <Box sx={{ 
      px: { xs: 3, md: 10 },
      py: { xs: 4, md: 6 },
      backgroundColor: '#ffffff'
    }}>
      <Typography variant="h4" component="h2" sx={{ 
        fontWeight: 'bold', 
        color: '#0f172a',
        mb: 3,
        textAlign: 'center'
      }}>
        Depoimentos de quem usou o GitMatch
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {testimonials.map((item) => (
          <Box key={item.id} sx={{
            backgroundColor: '#ffffff',
            borderRadius: 2,
            p: 3,
            flex: 1,
            boxShadow: 1,
            display: 'flex',
            gap: 2
          }}>
            <PersonOutlineIcon sx={{ color: '#1d4ed8', fontSize: 48 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                {item.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                {item.role}
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569', fontStyle: 'italic' }}>
                “{item.feedback}”
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

const testimonials = [
  {
    id: 1,
    name: 'Amanda Silva',
    role: 'Desenvolvedora Júnior',
    feedback: 'Consegui minha primeira vaga usando o GitMatch! O match com as empresas foi certeiro.',
  },
  {
    id: 2,
    name: 'Carlos Henrique',
    role: 'Frontend Pleno',
    feedback: 'Gostei muito do sistema de análise do GitHub. Achei bem justo e transparente.',
  },
  {
    id: 3,
    name: 'Fernanda Costa',
    role: 'Estudante de ADS',
    feedback: 'Ótima plataforma para quem está começando! Interface simples e eficiente.',
  },
];

// Componente FooterGradient
function FooterGradient() {
  return (
    <Box sx={{
      background: 'linear-gradient(to right, #1d4ed8, #0f172a)',
      py: 6,
      px: 3,
      borderRadius: '20px 20px 0 0',
      mt: 4,
      textAlign: 'center',
      color: 'white'
    }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        GitMatch
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        © 2025 GitMatch. Todos os direitos reservados.
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        suporte@gitmatch.com
      </Typography>
      <Typography variant="body2" sx={{ color: '#93c5fd' }}>
        Termos de uso • Privacidade
      </Typography>
    </Box>
  );
}