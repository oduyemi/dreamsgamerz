import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton
} from '@ionic/react';
import { person, notifications, settings, logOutOutline, pencilOutline, trophyOutline, cardOutline, shieldCheckmarkOutline } from 'ionicons/icons';
import { 
  Stack, 
  Typography, 
  Avatar, 
  IconButton, 
  Box, 
  Paper, 
  useTheme, 
  useMediaQuery,
  Divider,
  Badge,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import './Profile.css';

export const Profile = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [darkMode, setDarkMode] = useState(true);

  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    membership: 'Premium',
    points: 1250,
    joined: 'Member since Jan 2023',
    verified: true
  };

  return (
    <IonPage className={darkMode ? 'theme-dark' : 'theme-light'}style={{ marginBottom: "60px"}} >
      <IonHeader>
        <IonToolbar style={{ 
          backgroundColor: 'var(--color-panel)',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <IonTitle style={{ 
            color: 'var(--color-accent)', 
            textAlign: 'center',
            fontWeight: 600,
            fontSize: isSmall ? '1.1rem' : '1.3rem'
          }}>
            My Profile
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ backgroundColor: 'var(--background-primary)' }}>
        <Box px={2} pt={4} maxWidth={480} mx="auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stack spacing={2} alignItems="center" position="relative">
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <IconButton 
                    size="small" 
                    sx={{ 
                      bgcolor: 'var(--color-accent)',
                      '&:hover': { bgcolor: 'var(--color-accent-dark)' }
                    }}
                  >
                    <IonIcon 
                      icon={pencilOutline} 
                      style={{ fontSize: 16, color: '#fff' }} 
                    />
                  </IconButton>
                }
              >
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: 'var(--avatar-bg)',
                    border: '3px solid var(--color-accent)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                >
                  <IonIcon 
                    icon={person} 
                    style={{ 
                      fontSize: 56, 
                      color: 'var(--color-accent)' 
                    }} 
                  />
                </Avatar>
              </Badge>
              
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography 
                  fontSize={isSmall ? 20 : 24} 
                  fontWeight="bold" 
                  color="var(--text-primary)"
                >
                  {user.name}
                </Typography>
                {user.verified && (
                  <IonIcon 
                    icon={shieldCheckmarkOutline} 
                    style={{ 
                      color: '#4CAF50',
                      fontSize: 20
                    }} 
                  />
                )}
              </Stack>
              
              <Typography variant="body2" color="var(--text-secondary)">
                {user.email}
              </Typography>
              
              <Stack direction="row" spacing={2}>
                <Chip 
                  label={user.membership} 
                  size="small" 
                  sx={{ 
                    bgcolor: 'var(--color-accent-light)', 
                    color: 'var(--color-accent)',
                    fontWeight: 600
                  }} 
                />
                <Chip 
                  label={`${user.points} pts`} 
                  size="small" 
                  icon={<IonIcon icon={trophyOutline} style={{ fontSize: 14 }} />}
                  sx={{ 
                    bgcolor: 'var(--chip-bg)',
                    color: 'var(--text-primary)'
                  }} 
                />
              </Stack>
              
              <Typography variant="caption" color="var(--text-muted)">
                {user.joined}
              </Typography>
            </Stack>

            {/* Stats Section */}
            <Paper
              elevation={0}
              sx={{
                bgcolor: 'var(--color-panel)',
                borderRadius: 3,
                p: 2,
                mt: 3,
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                textAlign: 'center'
              }}
            >
              <Box>
                <Typography variant="body2" color="var(--text-muted)">
                  Games
                </Typography>
                <Typography fontWeight="bold" color="var(--text-primary)">
                  24
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ borderColor: 'var(--border-color)' }} />
              <Box>
                <Typography variant="body2" color="var(--text-muted)">
                  Wins
                </Typography>
                <Typography fontWeight="bold" color="var(--text-primary)">
                  18
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ borderColor: 'var(--border-color)' }} />
              <Box>
                <Typography variant="body2" color="var(--text-muted)">
                  Rank
                </Typography>
                <Typography fontWeight="bold" color="var(--text-primary)">
                  #42
                </Typography>
              </Box>
            </Paper>

            {/* Account Settings */}
            <Paper
              elevation={0}
              sx={{
                bgcolor: 'var(--color-panel)',
                borderRadius: 3,
                p: 0,
                mt: 3,
                overflow: 'hidden'
              }}
            >
              <Box p={2} bgcolor="var(--section-header)" borderBottom="1px solid var(--border-color)">
                <Typography fontWeight="bold" color='white'>Account</Typography>
              </Box>
              
              <Stack spacing={0} divider={<Divider sx={{ borderColor: 'var(--border-color)' }} />}>
                <Box 
                  p={2} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    '&:hover': { bgcolor: 'var(--hover-bg)' }
                  }}
                >
                  <IonIcon icon={settings} style={{ marginRight: 12, color: 'var(--color-accent)' }} />
                  <Typography flexGrow={1} color='white'>Settings</Typography>
                  <IonIcon icon={pencilOutline} style={{ color: 'var(--text-muted)' }} />
                </Box>
                
                <Box 
                  p={2} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    '&:hover': { bgcolor: 'var(--hover-bg)' }
                  }}
                >
                  <IonIcon icon={notifications} style={{ marginRight: 12, color: 'var(--color-accent)' }} />
                  <Typography flexGrow={1} color='white'>Notifications</Typography>
                  <IonIcon icon={pencilOutline} style={{ color: 'var(--text-muted)' }} />
                </Box>
                
                <Box 
                  p={2} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    '&:hover': { bgcolor: 'var(--hover-bg)' }
                  }}
                >
                  <IonIcon icon={cardOutline} style={{ marginRight: 12, color: 'var(--color-accent)' }} />
                  <Typography flexGrow={1} color='white'>Payment Methods</Typography>
                  <IonIcon icon={pencilOutline} style={{ color: 'var(--text-muted)' }} />
                </Box>
              </Stack>
            </Paper>

            {/* Actions */}
            <Box mt={3} textAlign="center">
              <IonButton 
                expand="block" 
                fill="clear" 
                color="danger"
                style={{
                  '--background-hover': 'rgba(244, 67, 54, 0.1)',
                  fontWeight: 500
                }}
              >
                <IonIcon icon={logOutOutline} slot="start" />
                Sign Out
              </IonButton>
            </Box>
          </motion.div>
        </Box>
      </IonContent>
    </IonPage>
  );
};