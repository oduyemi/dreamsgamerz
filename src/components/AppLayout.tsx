import { IonContent, IonFooter, IonPage, IonIcon } from '@ionic/react';
import { IconButton, Stack, Typography, Box } from '@mui/material';
import {
  home,
  gameController,
  image,
  wallet,
  person
} from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  const navItems = [
    { label: "Home", icon: home, path: "/" },
    { label: "Games", icon: gameController, path: "/games" },
    { label: "Videos", icon: image, path: "/videos" },
    { label: "Wallet", icon: wallet, path: "/wallet" },
    { label: "Me", icon: person, path: "/profile" },
  ];

  return (
    <IonPage>
      <IonContent fullscreen>{children}</IonContent>
      <IonFooter>
        <Box
          display="flex"
          justifyContent="space-around"
          px={2}
          py={1.5}
          sx={{
            bgcolor: '#1A1A1A',
            borderRadius: '16px 16px 0 0',
            boxShadow: 'var(--shadow-lg)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <Stack key={i} alignItems="center" spacing={0.5}>
                <IconButton
                  sx={{
                    color: isActive ? 'var(--accent-gold)' : 'rgba(255,255,255,0.7)',
                    p: 1.5,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      color: isActive ? 'var(--accent-gold)' : '#00BFFF',
                      transform: 'scale(1.15)',
                      background: 'rgba(255,255,255,0.05)',
                    },
                  }}
                  onClick={() => history.push(item.path)}
                >
                  <IonIcon icon={item.icon} style={{ fontSize: '22px' }} />
                </IconButton>
                <Typography
                  fontSize={10.5}
                  sx={{
                    color: isActive ? 'var(--accent-gold)' : 'rgba(255,255,255,0.6)',
                    fontWeight: isActive ? '600' : '400',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.label}
                </Typography>
              </Stack>
            );
          })}
        </Box>
      </IonFooter>
    </IonPage>
  );
};
