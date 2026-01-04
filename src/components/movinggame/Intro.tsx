import { Box, Typography, Stack, Divider, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { IonIcon, IonRouterLink } from '@ionic/react';

export const MovingPhotoGame = () => {

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, #fff6dc 0%, #eef1f7 45%, #e6e9f0 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      {/* Game Card */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 390,
          height: 680,
          borderRadius: 6,
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(245,246,250,0.75))',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(202,168,76,0.35)',
          boxShadow:
            '0 30px 70px rgba(0,0,0,0.14), inset 0 0 0 1px rgba(255,255,255,0.45)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 2.5,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Soft vignette */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at center, transparent 55%, rgba(0,0,0,0.06) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Top HUD */}
        <Box>
          <Typography
            fontSize={11}
            fontWeight={800}
            letterSpacing={1}
            color="#caa84c"
            textTransform="uppercase"
            mb={1}
          >
            Match Status
          </Typography>

          <Stack spacing={0.4}>
            <Typography fontSize={13}>
              Opponent Score: <b>0</b>
            </Typography>
            <Typography fontSize={13}>
              Chances Left: <b>5</b>
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography fontSize={13}>
                Win: <b>0</b>
              </Typography>
              <Typography fontSize={13}>
                Loss: <b>0</b>
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Game Area */}
        <Stack
          flex={1}
          alignItems="center"
          justifyContent="center"
          spacing={3}
          sx={{ position: 'relative' }}
        >
          {/* Gold Aura */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: 230,
              height: 230,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(202,168,76,0.45), transparent 70%)',
              filter: 'blur(28px)',
            }}
          />

          {/* Moving Target */}
            <Box
              sx={{
                width: 155,
                height: 155,
                borderRadius: '50%',
                padding: '5px',
                background:
                  'linear-gradient(135deg, #caa84c, #f7dc8a)',
                boxShadow:
                  '0 0 30px rgba(202,168,76,0.75), inset 0 0 12px rgba(255,255,255,0.65)',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                }}
              >
                <img
                  src="/images/avatar.png"
                  alt="Game Target"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Box>

          {/* CTA */}
            <Button
                component={IonRouterLink}
                href="/games/moving-game/start"                
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#caa84c',
                  letterSpacing: 0.5,
                  cursor: 'pointer',
                  px: 2.5,
                  py: 1,
                  borderRadius: 3,
                  border: '1px solid rgba(202,168,76,0.5)',
                  background:
                    'linear-gradient(145deg, #fff7df, #fff)',
                  boxShadow:
                    '0 4px 14px rgba(202,168,76,0.35)',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow:
                      '0 6px 20px rgba(202,168,76,0.5)',
                  },
                }}
              >
                Tap to Start
            </Button>
        </Stack>

        {/* Bottom HUD */}
        <Box>
          <Divider sx={{ mb: 1.5 }} />
          <Stack spacing={0.4}>
            <Typography fontSize={13}>
              Total Chances: <b>5</b>
            </Typography>
            <Typography fontSize={13}>
              Wins No: <b>0</b>
            </Typography>
            <Typography fontSize={13}>
              Lose No: <b>0</b>
            </Typography>
            <Typography fontSize={12} color="text.secondary">
              Get <b>two wins</b> to qualify for the next round
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
