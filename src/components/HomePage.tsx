import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/react';
import {
  notifications,
  eye,
  eyeOff
} from 'ionicons/icons';
import { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Grid,
  Badge,
  useTheme,
  useMediaQuery
} from '@mui/material';
import "./HomePage.css";
import HomeToken from '/images/hometoken.png';
import { GiTwoCoins } from 'react-icons/gi';


export const HomePage = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [hasNotifications, setHasNotifications] = useState(true);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <IonPage>
      <IonHeader className="header">
        <IonToolbar style={{ 
          backgroundColor: '#fff',
          borderBottom: '1px solid rgba(202, 168, 76, 0.2)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
        }}>
          <IonTitle 
            style={{ color: '#caa84c', textAlign: 'center', fontWeight: 700, fontSize: isSmall ? '1.2rem' : '1.5rem' }}
          >
            Dream Gamers
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
  fullscreen
  style={{
    backgroundColor: 'var(--color-bg)',
    color: 'var(--text-primary)',
  }}
>
  {/* Notification Bell */}
  <IconButton
    aria-label="Notifications"
    sx={{
      position: 'absolute',
      top: 16,
      right: 16,
      color: 'var(--accent-blue)',
      '&:hover': {
        backgroundColor: 'rgba(59,130,246,0.08)',
      },
    }}
    onClick={() => setHasNotifications(false)}
  >
    <Badge
      color="error"
      variant="dot"
      invisible={!hasNotifications}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <IonIcon icon={notifications} style={{ fontSize: '24px' }} />
    </Badge>
  </IconButton>

  {/* Balance Section */}
  <Box
    sx={{
      backgroundColor: 'var(--color-panel)',
      borderRadius: 'var(--radius-md)',
      p: { xs: 2, sm: 3 },
      mx: 2,
      mt: 2,
      boxShadow: 'var(--shadow-md)',
    }}
  >
    <Grid container spacing={2} justifyContent="space-around">
      {["Game Dollars", "Coin Balance", "Coin Earned"].map((label, index) => (
        <Grid item xs={4} key={index}>
          <Stack spacing={0.5} alignItems="center">
            <Typography fontSize={12} color="var(--text-muted)">
              {label}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              {showBalance ? (
                index === 2 ? (
                  <>
                    <GiTwoCoins
                      style={{
                        fontSize: '18px',
                        color: 'var(--accent-gold)',
                        marginRight: '2px',
                      }}
                    />
                    <Typography fontWeight="bold" color="var(--accent-blue)">
                      {(index + 1) * 50}
                    </Typography>
                  </>
                ) : (
                  <Typography
                    fontWeight="bold"
                    color={index === 0 ? "var(--accent-gold)" : "var(--accent-blue)"}
                  >
                    ${ (index + 1) * 50 }
                  </Typography>
                )
              ) : (
                <Typography>••••</Typography>
              )}

              {index === 0 && (
                <IonIcon
                  icon={showBalance ? eye : eyeOff}
                  style={{
                    fontSize: '16px',
                    color: 'var(--gray-500)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowBalance(!showBalance)}
                />
              )}
            </Stack>
          </Stack>
        </Grid>
      ))}
    </Grid>
  </Box>

  {/* Profile Section */}
  <Box
    sx={{
      backgroundColor: 'var(--color-panel)',
      borderRadius: 'var(--radius-md)',
      p: { xs: 2, sm: 3 },
      mx: 2,
      mt: 3,
      border: '1px solid var(--gray-100)',
      boxShadow: 'var(--shadow-sm)',
    }}
  >
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar
        src="/images/avatar.png"
        alt="User Avatar"
        sx={{
          width: 64,
          height: 64,
          border: `2px solid var(--accent-gold)`,
          boxShadow: '0 0 10px rgba(230,184,0,0.4)',
        }}
      />
      <Stack flex={1}>
        <Typography variant="h6" fontWeight="bold" color="var(--accent-gold)">
          Dreamer
        </Typography>
        <Typography variant="body2" color="var(--text-muted)">
          Level 1 Adventurer
        </Typography>

        {/* Progress Bar */}
        <Box
          sx={{
            width: '100%',
            height: '6px',
            backgroundColor: 'var(--gray-100)',
            borderRadius: '3px',
            mt: 1,
          }}
        >
          <Box
            sx={{
              width: '30%',
              height: '100%',
              backgroundColor: 'var(--accent-gold)',
              borderRadius: '3px',
              boxShadow: '0 0 5px rgba(230,184,0,0.7)',
            }}
          />
        </Box>
        <Typography
          variant="caption"
          color="var(--text-muted)"
          sx={{ mt: 0.5 }}
        >
          120/400 XP to next level
        </Typography>
      </Stack>
    </Stack>
  </Box>

  {/* Token Section */}
  <Box
    sx={{
      position: 'relative',
      mt: 3,
      mb: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Typography
      variant="h5"
      fontWeight="bold"
      color="var(--accent-gold)"
      sx={{
        textShadow: '0 0 6px rgba(230,184,0,0.4)',
      }}
    >
      Dream Tokens
    </Typography>

    <Box className="token-wrapper">
      {/* Glow effect */}
      <Box
        sx={{
          position: 'absolute',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
          filter: 'blur(10px)',
          animation: 'pulse 3s infinite alternate',
        }}
      />
      <img src={HomeToken} alt="Dreams token" className="token-bouncing" />
      <svg className="curved-text-svg" viewBox="0 0 150 150">
        <defs>
          <path id="textPath" d="M 75,75 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" />
        </defs>
        <text>
          <textPath xlinkHref="#textPath" startOffset="50%" textAnchor="middle">
            We help you earn money by fulfilling your dreams
          </textPath>
        </text>
      </svg>
    </Box>

    <Typography
      variant="body2"
      color="var(--text-muted)"
      sx={{
        mt: 2,
        textAlign: 'center',
        maxWidth: '80%',
      }}
    >
      Your current balance:{' '}
      <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>
        1,250 USDT
      </span>
    </Typography>
  </Box>
</IonContent>

    </IonPage>
  );
};