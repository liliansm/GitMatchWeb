import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Chip,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ProfileSection({ user }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      backgroundColor: '#EEF3F9',
      minHeight: '100vh',
      pb: 8
    }}>
      {/* Cabeçalho do Perfil */}
      <Paper elevation={3} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 6,
        pb: 4,
        px: 3,
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        mb: 3
      }}>
        <Avatar
          src={user.fotoPerfil}
          sx={{
            width: 130,
            height: 130,
            border: '3px solid #1d4ed8',
            mb: 2
          }}
        />

        <Typography variant="h5" fontWeight={700} color="#1e293b">
          {user.nome}
        </Typography>

        <Typography variant="body2" color="#64748b" mb={0.5}>
          @{user.githubUsername}
        </Typography>

        <Typography variant="subtitle1" color="#1d4ed8" fontWeight={600} mb={2}>
          {user.profissao}
        </Typography>


      </Paper>

      {/* Seção de Habilidades e Bio */}
      <Paper elevation={1} sx={{
        backgroundColor: '#F8FAFC',
        borderRadius: '20px',
        mx: isMobile ? 2 : 4,
        p: 3
      }}>
        {/* Seção de Habilidades */}
        <Typography variant="h6" fontWeight={600} color="#0f172a" mb={2}>
          Habilidades
        </Typography>

        <Box sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          mb: 3
        }}>
          {user.tecnologias.length > 0 ? (
            user.tecnologias.map((tech, index) => (
              <Chip
                key={index}
                label={`#${tech}`}
                variant="outlined"
                sx={{
                  borderColor: '#1d4ed8',
                  backgroundColor: '#e0ecff',
                  color: '#1d4ed8',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  '& .MuiChip-label': {
                    px: 1.5,
                    py: 0.5
                  }
                }}
              />
            ))
          ) : (
            <Typography variant="body2">Nenhuma tecnologia cadastrada</Typography>
          )}
        </Box>

        {/* Seção Sobre */}
        <Box mt={2}>
          <Typography variant="h6" fontWeight={600} color="#0f172a" mb={1}>
            Sobre
          </Typography>
          <Typography variant="body1" color="#334155" sx={{ lineHeight: 1.75 }}>
            {user.bio}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}