import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/react';
import {
  wallet,
  eye,
  eyeOff,
  arrowUpOutline,
  arrowDownOutline,
} from 'ionicons/icons';
import { useState } from 'react';
import { Box, Stack, Typography, IconButton, Paper, useTheme, useMediaQuery } from '@mui/material';

export const Wallet = () => {
  const [showBalance, setShowBalance] = useState(true);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar style={{ backgroundColor: 'var(--color-panel)' }}>
          <IonTitle style={{ color: 'var(--color-accent)', textAlign: 'center' }}>
            Wallet
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ backgroundColor: '#121212', color: '#fff' }}>
        <Box px={2} pt={4} textAlign="center" maxWidth={420} mx="auto">
          <Paper
            elevation={6}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'var(--color-panel)',
              color: 'var(--text-primary)',
            }}
          >
            <Stack spacing={2} alignItems="center">
              <IconButton
                onClick={() => setShowBalance(!showBalance)}
                sx={{ color: 'var(--accent-gold)', transition: 'transform 0.3s' }}
                aria-label={showBalance ? 'Hide balance' : 'Show balance'}
              >
                <IonIcon icon={showBalance ? eyeOff : eye} />
              </IconButton>
              {showBalance ? (
                <>
                  <Typography fontSize={isSmall ? 16 : 18} fontWeight="bold">
                    Wallet Balance: <span style={{ color: 'var(--accent-blue)' }}>$1,250</span>
                  </Typography>
                  <Typography fontSize={isSmall ? 14 : 16} color="var(--text-muted)">
                    Last deposit: <span style={{ color: '#4CAF50' }}>+ $500</span>
                  </Typography>
                  <Typography fontSize={isSmall ? 14 : 16} color="var(--text-muted)">
                    Last withdrawal: <span style={{ color: '#F44336' }}>- $150</span>
                  </Typography>
                </>
              ) : (
                <Typography variant="h6" fontWeight="bold">
                  Balance Hidden
                </Typography>
              )}
            </Stack>
          </Paper>

          {/* Quick Actions */}
          <Stack direction="row" justifyContent="center" spacing={4} mt={4}>
            <IconButton
              sx={{
                bgcolor: '#00BFFF',
                p: 2,
                borderRadius: 3,
                transition: '0.3s',
                '&:hover': { bgcolor: '#008CBA', transform: 'scale(1.1)' },
              }}
              aria-label="Deposit"
            >
              <IonIcon icon={arrowDownOutline} style={{ color: '#1E1E1E' }} />
            </IconButton>
            <IconButton
              sx={{
                bgcolor: '#00BFFF',
                p: 2,
                borderRadius: 3,
                transition: '0.3s',
                '&:hover': { bgcolor: '#008CBA', transform: 'scale(1.1)' },
              }}
              aria-label="Withdraw"
            >
              <IonIcon icon={arrowUpOutline} style={{ color: '#1E1E1E' }} />
            </IconButton>
          </Stack>
        </Box>
      </IonContent>
    </IonPage>
  );
};
