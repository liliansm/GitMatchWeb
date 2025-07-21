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
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Navbar = ({ isLoggedIn = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    setMenuOpen(false);
    // Implemente sua lógica de logout aqui
    alert('Você saiu da sua conta!');
  };

  const handleNavigation = (route) => {
    setMenuOpen(false);
    navigate(route);
  };

  // Itens do menu baseados no estado de login
  const menuItems = isLoggedIn
    ? [
        { label: 'Perfil', path: '/profile' },
        { label: 'Vagas', path: '/vagas' },
        { label: 'Notificações', path: '/notification' },
        { label: 'Sair', action: handleLogout }
      ]
    : [
        { label: 'Login', path: '/login' },
        { label: 'Cadastrar-se', path: '/register' }
      ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#fff', color: '#1d4ed8', boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 }
            }}
            onClick={() => navigate('/')}
          >
            GitMatch
          </Typography>

          {/* Menu Desktop */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {menuItems.map((item, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                  onClick={() => item.path ? handleNavigation(item.path) : item.action?.()}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          )}

          {/* Menu Hamburguer (Mobile) */}
          {isMobile && (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon sx={{ fontSize: '32px' }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer Mobile */}
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <IconButton onClick={() => setMenuOpen(false)} sx={{ mb: 1 }}>
            <ArrowBackIcon sx={{ fontSize: '28px' }} />
          </IconButton>

          <List>
            {menuItems.map((item, index) => (
              <ListItem 
                button 
                key={index}
                onClick={() => item.path ? handleNavigation(item.path) : item.action?.()}
                sx={{ py: 1.5 }}
              >
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ fontSize: '1.1rem' }} 
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;