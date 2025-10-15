import React from 'react';
import { IonIcon } from '@ionic/react';
import { IconButton, Stack, Typography, Box, Paper } from '@mui/material';
import {
  home,
  gameController,
  image,
  wallet,
  person,
} from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: home, path: '/' },
    { label: 'Games', icon: gameController, path: '/games' },
    { label: 'Videos', icon: image, path: '/videos' },
    { label: 'Wallet', icon: wallet, path: '/wallet' },
    { label: 'Me', icon: person, path: '/profile' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
      }}
    >
      {/* Scrollable main area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          pb: { xs: 10, sm: 11 }, // keep footer visible
        }}
      >
        {children}
      </Box>

      {/* Fixed Footer Navigation */}
      <Paper
        elevation={8}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          borderRadius: '16px 16px 0 0',
          backgroundColor: '#111',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          zIndex: 1200,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            py: 1.2,
          }}
        >
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path;

            return (
              <Stack
                key={i}
                alignItems="center"
                spacing={0.4}
                sx={{
                  cursor: 'pointer',
                  color: isActive ? '#caa84c' : 'rgba(255,255,255,0.75)',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    color: '#caa84c',
                    transform: 'translateY(-3px)',
                  },
                }}
                onClick={() => history.push(item.path)}
              >
                <IconButton
                  sx={{
                    color: 'inherit',
                    p: 1,
                    '&:hover': { transform: 'scale(1.15)' },
                    transition: 'transform 0.25s ease',
                  }}
                >
                  <IonIcon icon={item.icon} style={{ fontSize: 22 }} />
                </IconButton>

                {isActive && (
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: '#caa84c',
                      boxShadow: '0 0 6px rgba(202,168,76,0.7)',
                    }}
                  />
                )}

                <Typography
                  variant="caption"
                  sx={{
                    fontSize: 10,
                    textTransform: 'uppercase',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: 0.4,
                  }}
                >
                  {item.label}
                </Typography>
              </Stack>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
};
