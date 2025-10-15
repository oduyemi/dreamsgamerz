import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/react';
import { notifications, eye, eyeOff } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Grid,
  Badge,
  useTheme,
  useMediaQuery,
  GlobalStyles,
  keyframes,
} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import HomeToken from '/images/hometoken.png';
import { GiTwoCoins } from 'react-icons/gi';

export const HomePage = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [hasNotifications, setHasNotifications] = useState(true);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const controls = useAnimation();

  // Glow animation keyframes
  const pulseGlow = keyframes`
    0% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); opacity: 0.7; }
  `;

  // Motion variants for staggered fade + lift + scale
  const fadeLiftVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      controls.start((i) => 'visible');
    }, 300);
    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <IonPage>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: '#ffffff',
          },
          '@keyframes pulse': pulseGlow,
        }}
      />

      <IonHeader>
        <IonToolbar
          style={{
            backgroundColor: '#fff',
            borderBottom: '1px solid rgba(202, 168, 76, 0.2)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <IonTitle
            style={{
              color: '#caa84c',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: isSmall ? '1.2rem' : '1.5rem',
            }}
          >
            Dream Gamers
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        style={{
          backgroundColor: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
          overflow: 'hidden',
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
            '&:hover': { backgroundColor: 'rgba(59,130,246,0.08)' },
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

        <motion.div custom={0} variants={fadeLiftVariant} initial="hidden" animate={controls}>
          {/* Balance Section */}
          <Box
            sx={{
              backgroundColor: '#fafafa',
              borderRadius: 3,
              p: { xs: 2, sm: 3 },
              mx: 2,
              mt: -2,
              mb: 2,
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'translateY(-3px)' },
            }}
          >
            <Grid container spacing={2} justifyContent="space-around">
              {["Game Dollars", "Coin Balance", "Coin Earned"].map((label, index) => (
                <Grid item xs={4} key={index}>
                  <Stack spacing={0.5} alignItems="center">
                    <Typography fontSize={12} color="text.secondary">
                      {label}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      {showBalance ? (
                        index === 2 ? (
                          <>
                            <GiTwoCoins style={{ fontSize: '18px', color: '#caa84c', marginRight: '2px' }} />
                            <Typography fontWeight="bold" color="primary">
                              {(index + 1) * 50}
                            </Typography>
                          </>
                        ) : (
                          <Typography fontWeight="bold" color={index === 0 ? '#caa84c' : 'primary'}>
                            ${ (index + 1) * 50 }
                          </Typography>
                        )
                      ) : (
                        <Typography>••••</Typography>
                      )}

                      {index === 0 && (
                        <IonIcon
                          icon={showBalance ? eye : eyeOff}
                          style={{ fontSize: '16px', color: '#888', cursor: 'pointer' }}
                          onClick={() => setShowBalance(!showBalance)}
                        />
                      )}
                    </Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        <motion.div custom={1} variants={fadeLiftVariant} initial="hidden" animate={controls}>
          {/* Profile Section */}
          <Box
            sx={{
              backgroundColor: '#fafafa',
              borderRadius: 3,
              p: { xs: 2, sm: 3 },
              mx: 2,
              mb: 2,
              border: '1px solid #eee',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'translateY(-3px)' },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                src="/images/avatar.png"
                alt="User Avatar"
                sx={{
                  width: 64,
                  height: 64,
                  border: '2px solid #caa84c',
                  boxShadow: '0 0 10px rgba(230,184,0,0.4)',
                }}
              />
              <Stack flex={1}>
                <Typography variant="h6" fontWeight="bold" color="#caa84c">
                  Dreamer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Level 1 Adventurer
                </Typography>

                <Box sx={{ width: '100%', height: '6px', backgroundColor: '#eee', borderRadius: '3px', mt: 1 }}>
                  <Box sx={{ width: '30%', height: '100%', backgroundColor: '#caa84c', borderRadius: '3px', boxShadow: '0 0 5px rgba(230,184,0,0.7)' }} />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                  120/400 XP to next level
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </motion.div>

        <motion.div custom={2} variants={fadeLiftVariant} initial="hidden" animate={controls}>
          {/* Token Section */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: { xs: '180px', sm: '220px' },
                height: { xs: '180px', sm: '220px' },
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(202,168,76,0.2) 0%, transparent 70%)',
                filter: 'blur(12px)',
                animation: `${pulseGlow} 4s ease-in-out infinite`,
              }}
            />

            <img
              src={HomeToken}
              alt="Dreams token"
              style={{
                width: isSmall ? '120px' : '150px',
                height: isSmall ? '120px' : '150px',
                animation: 'bounce-subtle 2.5s ease-in-out infinite',
                filter: 'drop-shadow(0 0 8px rgba(202, 168, 76, 0.5))',
              }}
            />

            <Typography
              variant="h5"
              fontWeight="bold"
              color="#caa84c"
              sx={{ textShadow: '0 0 6px rgba(230,184,0,0.4)', mt: 2 }}
            >
              Dream Tokens
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
              Your current balance: <span style={{ color: '#caa84c', fontWeight: 'bold' }}>1,250 USDT</span>
            </Typography>
          </Box>
        </motion.div>
      </IonContent>
    </IonPage>
  );
};