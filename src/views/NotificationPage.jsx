import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Button, 
  Divider, 
  useTheme,
  Alert,
  Paper
} from '@mui/material';
import Navbar from '../components/Navbar';

export default function NotificationsScreen() {
  const theme = useTheme();
  const notifications = [
    {
      id: 1,
      type: 'vaga',
      title: 'Nova vaga',
      subtitle: 'Analista de Sistemas',
      time: 'Há 2h',
      iconColor: '#D19401',
    },
    {
      id: 2,
      type: 'match',
      title: 'Ana Carvalho',
      subtitle: 'É compatível com a vaga de Dev FrontEnd',
      time: 'Há 4h',
      image: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
    {
      id: 3,
      type: 'vaga',
      title: 'Nova vaga',
      subtitle: 'Analista de Sistemas',
      time: 'Há 6h',
      iconColor: '#D19401',
    },
    {
      id: 4,
      type: 'match',
      title: 'Ana Carvalho',
      subtitle: 'É compatível com a vaga de Dev FrontEnd',
      time: 'Há 9h',
      image: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
  ];

  const handleDeleteAccount = () => {
    Alert.alert(
      'Tem certeza?',
      'Deseja mesmo excluir sua conta? Essa ação não poderá ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim, excluir',
          style: 'destructive',
          onPress: () => {
            console.log('Conta excluída');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Box sx={{ 
      backgroundColor: '#EEF3F9', 
      minHeight: '100vh',
      pb: 8
    }}>
      <Navbar isLoggedIn={true} />
      
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 600,
          mb: 2,
          color: theme.palette.text.primary
        }}>
          Notificações
        </Typography>

        {notifications.map((item) => (
          <Paper 
            key={item.id} 
            elevation={0}
            sx={{
              backgroundColor: '#fff',
              borderRadius: 1,
              p: 2,
              mb: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            {item.type === 'vaga' ? (
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: item.iconColor,
                  mr: 1.5
                }}
              />
            ) : (
              <Avatar 
                src={item.image} 
                sx={{ 
                  width: 40, 
                  height: 40,
                  mr: 1.5
                }} 
              />
            )}

            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>
                {item.subtitle}
              </Typography>
            </Box>

            <Typography variant="caption" sx={{ color: '#888' }}>
              {item.time}
            </Typography>
          </Paper>
        ))}

        <Button
          variant="text"
          fullWidth
          sx={{ 
            mt: 3,
            color: '#666',
            textTransform: 'none',
            fontSize: '0.875rem'
          }}
        >
          Ver mais notificações
        </Button>

        <Divider sx={{ my: 3 }} />

      </Box>
    </Box>
  );
}