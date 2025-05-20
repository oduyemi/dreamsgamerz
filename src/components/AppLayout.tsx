import { IonContent, IonFooter, IonPage } from '@ionic/react';
import { IconButton, Stack, Typography, Box } from '@mui/material';
import {
  home,
  gameController,
  image,
  wallet,
  person
} from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { IonIcon } from '@ionic/react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  const navItems = [
    { label: "Home", icon: home, path: "/" },
    { label: "Game", icon: gameController, path: "/games" },
    { label: "Moving Picture", icon: image, path: "/games/moving-picture" },
    { label: "Wallet", icon: wallet, path: "/wallet" },
    { label: "Me", icon: person, path: "/profile" },
  ];

  return (
    <IonPage>
      <IonContent fullscreen>{children}</IonContent>

      {/* Shared Footer */}
      <IonFooter>
        <Box 
          p={2}
          display="flex"
          justifyContent="space-around"
          sx={{ 
            bgcolor: "var(--color-footer)", 
            borderRadius: '15px 15px 0 0',
            boxShadow: '0px -4px 10px rgba(0,0,0,0.3)' 
          }}
        >
          {navItems.map((item, index) => (
            <Stack key={index} alignItems="center">
              <IconButton
                onClick={() => history.push(item.path)}
                sx={{ 
                  color: location.pathname === item.path ? 'var(--accent-gold)' : 'var(--accent-blue)',
                  transition: '0.3s',
                  '&:hover': { color: '#FFF' }
                }}
              >
                <IonIcon icon={item.icon} />
              </IconButton>
              <Typography variant="body2" sx={{ color: location.pathname === item.path ? 'var(--accent-gold)' : 'var(--accent-blue)' }}>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Box>
      </IonFooter>
    </IonPage>
  );
};
