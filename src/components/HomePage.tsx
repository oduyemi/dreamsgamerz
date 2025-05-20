import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonFooter
} from '@ionic/react';
import {
  notifications,
  people,
  statsChart,
  home,
  gameController,
  image,
  wallet,
  person,
  eye,
  eyeOff
} from 'ionicons/icons';
import { useState } from 'react';
import { Box, Stack, Typography, IconButton, Avatar, Grid, Paper, useTheme, useMediaQuery } from '@mui/material';
import "./HomePage.css";

export const HomePage = () => {
  const [showBalance, setShowBalance] = useState(true);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar style={{ backgroundColor: 'var(--color-panel)' }}>
          <IonTitle style={{ color: 'var(--color-accent)', textAlign: 'center' }}>
            Balance
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Content */}
      <IonContent fullscreen style={{ backgroundColor: '#121212', color: '#fff' }}>
        {/* Notifications Icon */}
        <IconButton
          aria-label="Notifications"
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 999,
            color: '#00BFFF',
            transition: '0.3s',
            '&:hover': { transform: 'scale(1.1)' }
          }}
        >
          <IonIcon icon={notifications} />
        </IconButton>

        {/* Balance Section */}
        <Box px={2} pt={4} textAlign="center">
          <Paper
            elevation={6}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'var(--color-panel)',
              color: 'var(--text-primary)',
              maxWidth: 420,
              mx: 'auto',
            }}
          >
            <Stack spacing={2} alignItems="center">
              <IconButton onClick={() => setShowBalance(!showBalance)} sx={{ color: 'var(--accent-gold)' }}>
                <IonIcon icon={showBalance ? eyeOff : eye} />
              </IconButton>
              {showBalance ? (
                <>
                  <Typography fontSize={isSmall ? 16 : 18} fontWeight="bold">Game Dollars: <span style={{ color: 'var(--accent-blue)' }}>$125</span></Typography>
                  <Typography fontSize={isSmall ? 16 : 18} fontWeight="bold">USD Owned: <span style={{ color: 'var(--accent-blue)' }}>$66</span></Typography>
                  <Typography fontSize={isSmall ? 16 : 18} fontWeight="bold">USD Earned: <span style={{ color: 'var(--accent-blue)' }}>$86</span></Typography>
                </>
              ) : (
                <Typography variant="h6" fontWeight="bold">Balance Hidden</Typography>
              )}
            </Stack>
          </Paper>
        </Box>

        {/* User Profile Section */}
        <Stack spacing={1.5} alignItems="center" mt={2}>
          <Avatar
            sx={{
              width: 90,
              height: 90,
              bgcolor: 'transparent',
              border: '3px solid var(--color-accent)',
            }}
          />
          <Typography fontWeight="bold" fontSize={18} color="#caa84c">User Name</Typography>
        </Stack>

        {/* Description Section */}
        <Stack spacing={1} textAlign="center" mt={4} px={3}>
          <Typography variant="h5" fontWeight="bold" color="#caa84c">Dreams</Typography>
          <Typography variant="body2" color="var(--text-muted)">Token Picture</Typography>
          <Typography variant="body2" color="var(--text-muted)">We help you earn money by...</Typography>
        </Stack>

        {/* Quick Actions */}
        <Grid container justifyContent="center" spacing={isSmall ? 2 : 4} mt={3} mb={3} px={2}>
          {[{ label: "Friends", icon: people }, { label: "Stats", icon: statsChart }].map((item, index) => (
            <Grid item xs={6} sm="auto" key={index}>
              <Stack alignItems="center">
                <IconButton
                  sx={{
                    bgcolor: '#00BFFF',
                    p: 2,
                    borderRadius: 3,
                    transition: '0.3s',
                    '&:hover': { bgcolor: '#008CBA' }
                  }}
                >
                  <IonIcon icon={item.icon} style={{ color: '#1E1E1E' }} />
                </IconButton>
                <Typography fontSize={14} mt={0.5} color="#FFF">{item.label}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </IonContent>

      {/* Footer Navigation */}
      <IonFooter>
        <Box
          px={2}
          py={1}
          display="flex"
          justifyContent="space-around"
          sx={{
            bgcolor: '#1E1E1E',
            borderRadius: '15px 15px 0 0',
            boxShadow: '0px -4px 10px rgba(0,0,0,0.3)'
          }}
        >
          {[
            { label: "Home", icon: home },
            { label: "Game", icon: gameController },
            { label: "Picture", icon: image },
            { label: "Wallet", icon: wallet },
            { label: "Me", icon: person }
          ].map((item, index) => (
            <Stack key={index} alignItems="center" spacing={0.5}>
              <IconButton
                sx={{
                  color: index === 0 ? '#caa84c' : '#00BFFF',
                  transition: '0.3s',
                  '&:hover': { color: '#FFF' },
                  p: 1.5
                }}
              >
                <IonIcon icon={item.icon} />
              </IconButton>
              <Typography fontSize={11} sx={{ color: index === 0 ? '#caa84c' : '#00BFFF' }}>{item.label}</Typography>
            </Stack>
          ))}
        </Box>
      </IonFooter>
    </IonPage>
  );
};
