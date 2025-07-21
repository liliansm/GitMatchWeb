import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
  Button,
  Divider,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = ({ isLoggedIn = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    setMenuOpen(false);
    alert('Você saiu da sua conta!');
  };

  const handleNavigation = (route) => {
    setMenuOpen(false);
    navigate(route);
  };

  // Função específica para navegar para a home
  const goToHome = () => {
    navigate('/home');
  };

  const menuItems = isLoggedIn
    ? [
        { label: 'Perfil', path: '/profile', icon: <AccountCircleIcon sx={{ mr: 1 }} /> },
        { label: 'Vagas', path: '/vagas', icon: <AccountCircleIcon sx={{ mr: 1 }} /> },
        { label: 'Notificações', path: '/notification', icon: <AccountCircleIcon sx={{ mr: 1 }} /> },
        { label: 'Sair', action: handleLogout, icon: <AccountCircleIcon sx={{ mr: 1 }} /> }
      ]
    : [
        { label: 'Login', path: '/login', icon: <AccountCircleIcon sx={{ mr: 1 }} /> },
        { label: 'Cadastrar-se', path: '/register', icon: <AccountCircleIcon sx={{ mr: 1 }} /> }
      ];

  return (
    <>
      <AppBar position="static" sx={{ 
        backgroundColor: 'background.paper', 
        color: 'primary.main', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }
      }}>
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          py: 1,
          px: { xs: 2, md: 4 }
        }}>
          {/* Logo - Agora com onClick explícito */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer' 
            }}
            onClick={goToHome} 
          >
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #1d4ed8 30%, #3b82f6 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'scale(1.03)',
                  opacity: 0.9
                }
              }}
            >
              GitMatch
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              alignItems: 'center'
            }}>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.label === 'Cadastrar-se' ? 'contained' : 'text'}
                  color="primary"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    px: 2,
                    transition: 'all 0.2s ease',
                    ...(item.label !== 'Cadastrar-se' && {
                      '&:hover': { 
                        backgroundColor: 'rgba(29, 78, 216, 0.08)',
                        transform: 'translateY(-1px)'
                      }
                    })
                  }}
                  onClick={() => item.path ? handleNavigation(item.path) : item.action?.()}
                  // startIcon={item.icon}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {isMobile && (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setMenuOpen(true)}
              sx={{
                backgroundColor: 'rgba(29, 78, 216, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(29, 78, 216, 0.2)'
                }
              }}
            >
              <MenuIcon sx={{ fontSize: '32px' }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: 'background.paper',
            backgroundImage: 'none'
          }
        }}
      >
        
      </Drawer>
    </>
  );
};

export default Navbar;