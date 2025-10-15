import { IonIcon } from '@ionic/react';
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
  keyframes,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { GiTwoCoins } from 'react-icons/gi';
import HomeToken from '/images/hometoken.png';

export const HomePage = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [hasNotifications, setHasNotifications] = useState(true);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const controls = useAnimation();

  // Subtle looping glow animation
  const pulseGlow = keyframes`
    0% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); opacity: 0.7; }
  `;

  // Fade + lift animation variants
  const fadeLiftVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.08,
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
    <Box
      sx={{
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
      }}
    >
      {/* Notification Bell */}
      <IconButton
        aria-label="Notifications"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: '#5b7fff',
          '&:hover': { backgroundColor: 'rgba(91,127,255,0.08)' },
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
      <motion.div
        custom={0}
        variants={fadeLiftVariant}
        initial="hidden"
        animate={controls}
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 90, damping: 14 }}
        style={{ width: '100%', maxWidth: 600 }}
      >
        <Box
          sx={{
            background: 'linear-gradient(145deg, #ffffff, #fafafa)',
            borderRadius: 3,
            p: { xs: 2, sm: 3 },
            mx: 2,
            mb: 1,
            mt: -14.8, // moves it slightly upward
            boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
            border: '1px solid #f0f0f0',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 6px 18px rgba(202,168,76,0.25)',
            },
          }}
        >
          <Grid container spacing={2} justifyContent="space-around">
            {['Game Dollars', 'Coin Balance', 'Coin Earned'].map((label, index) => (
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
                          ${(index + 1) * 50}
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

      {/* Profile Section */}
      <motion.div
        custom={1}
        variants={fadeLiftVariant}
        initial="hidden"
        animate={controls}
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 90, damping: 14 }}
        style={{ width: '100%', maxWidth: 600 }}
      >
        <Box
          sx={{
            background: 'linear-gradient(145deg, #ffffff, #fafafa)',
            borderRadius: 3,
            p: { xs: 2, sm: 3 },
            mx: 2,
            mb: 1,
            mt: -3.5, // moves it upward slightly too
            border: '1px solid #eee',
            boxShadow: '0 3px 10px rgba(0,0,0,0.04)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(202,168,76,0.25)',
            },
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
                boxShadow: '0 0 12px rgba(230,184,0,0.4)',
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
                <Box
                  sx={{
                    width: '30%',
                    height: '100%',
                    backgroundColor: '#caa84c',
                    borderRadius: '3px',
                    boxShadow: '0 0 5px rgba(230,184,0,0.7)',
                  }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                120/400 XP to next level
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </motion.div>

      {/* Token Section */}
      <motion.div
        custom={2}
        variants={fadeLiftVariant}
        initial="hidden"
        animate={controls}
        transition={{ type: 'spring', stiffness: 90, damping: 14 }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 3,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: { xs: '180px', sm: '220px' },
              height: { xs: '180px', sm: '220px' },
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(202,168,76,0.25) 0%, transparent 70%)',
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
              filter: 'drop-shadow(0 0 8px rgba(202,168,76,0.5))',
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
            Your current balance:{' '}
            <span style={{ color: '#caa84c', fontWeight: 'bold' }}>1,250 USDT</span>
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};
