import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/react';
import { person, notifications, settings, logOutOutline } from 'ionicons/icons';
import { Stack, Typography, Avatar, IconButton, Box, Paper, useTheme, useMediaQuery } from '@mui/material';

export const Profile = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ backgroundColor: 'var(--color-panel)' }}>
          <IonTitle style={{ color: 'var(--color-accent)', textAlign: 'center' }}>
            Profile
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ backgroundColor: '#121212', color: '#fff' }}>
        <Box px={2} pt={4} maxWidth={420} mx="auto" textAlign="center">
          <Stack spacing={2} alignItems="center">
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'transparent',
                border: '3px solid var(--color-accent)',
              }}
            >
              <IonIcon icon={person} style={{ fontSize: 56, color: 'var(--color-accent)' }} />
            </Avatar>
            <Typography fontSize={isSmall ? 18 : 22} fontWeight="bold" color="#FFD700">
              User Name
            </Typography>
            <Typography variant="body2" color="var(--text-muted)">
              user.email@example.com
            </Typography>
          </Stack>

          {/* Profile Info Box */}
          <Paper
            elevation={6}
            sx={{
              bgcolor: 'var(--color-panel)',
              borderRadius: 3,
              p: 3,
              mt: 4,
              textAlign: 'left',
              color: 'var(--text-primary)',
            }}
          >
            <Typography fontWeight="bold" mb={1}>Account Settings</Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ cursor: 'pointer', transition: 'color 0.3s', '&:hover': { color: '#00BFFF' } }}>
                <IonIcon icon={settings} />
                <Typography>Settings</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ cursor: 'pointer', transition: 'color 0.3s', '&:hover': { color: '#00BFFF' } }}>
                <IonIcon icon={notifications} />
                <Typography>Notifications</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ cursor: 'pointer', transition: 'color 0.3s', '&:hover': { color: '#F44336' } }}>
                <IonIcon icon={logOutOutline} />
                <Typography>Logout</Typography>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </IonContent>
    </IonPage>
  );
};
