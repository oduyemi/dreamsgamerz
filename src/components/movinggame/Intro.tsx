import { Box, Typography, Stack, Divider, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { IonRouterLink } from '@ionic/react';

export const MovingPhotoGame = () => {
  return (
    <Box
      sx={{
        minHeight: '100svh',
        background:
          'radial-gradient(circle at top, #fff8e6 0%, #eef1f7 50%, #e4e8f0 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        px: 2,
        pt: 'env(safe-area-inset-top)',
        pb: 'env(safe-area-inset-bottom)',
        overflow: 'hidden',
      }}
    >
      {/* TOP HUD — glass */}
      <Box
        sx={{
          backdropFilter: 'blur(14px)',
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.7), rgba(255,255,255,0.35))',
          borderRadius: 4,
          px: 2,
          py: 1.5,
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        }}
      >
        <Typography
          fontSize={11}
          fontWeight={800}
          letterSpacing={1}
          color="#caa84c"
          textTransform="uppercase"
          mb={0.5}
        >
          Match Status
        </Typography>

        <Stack direction="row" justifyContent="space-between">
          <Typography fontSize={13}>
            Opponent <b>0</b>
          </Typography>
          <Typography fontSize={13}>
            Chances <b>5</b>
          </Typography>
          <Typography fontSize={13}>
            Win <b>0</b> / Loss <b>0</b>
          </Typography>
        </Stack>
      </Box>

      {/* GAME AREA */}
      <Box
        sx={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Soft vignette */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.06) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Center guide */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(202,168,76,0.55), transparent)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#caa84c',
            boxShadow: '0 0 12px rgba(202,168,76,0.9)',
          }}
        />

        {/* Moving Target — perimeter loop */}
        <motion.div
          animate={{
            x: ['40vw', '40vw', '-40vw', '-40vw', '40vw'],
            y: ['35vh', '-35vh', '-35vh', '35vh', '35vh'],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ position: 'absolute', zIndex: 2 }}
        >
          <Box
            sx={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              p: '4px',
              background:
                'linear-gradient(135deg, #caa84c, #f7dc8a)',
              boxShadow:
                '0 0 36px rgba(202,168,76,0.75)',
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
                alt="Target"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Box>
        </motion.div>
      </Box>

      {/* CTA + FOOTER */}
      <Stack spacing={1.5} alignItems="center">
        <Button
          component={IonRouterLink}
          href="/games/moving-game/start"
          sx={{
            width: '100%',
            maxWidth: 360,
            fontSize: 16,
            fontWeight: 800,
            color: '#caa84c',
            letterSpacing: 0.6,
            py: 1.3,
            borderRadius: 3.5,
            border: '1px solid rgba(202,168,76,0.5)',
            background:
              'linear-gradient(145deg, #fff7df, #ffffff)',
            boxShadow:
              '0 10px 26px rgba(202,168,76,0.45)',
            '&:active': {
              transform: 'scale(0.98)',
            },
          }}
        >
          Tap to Start
        </Button>

        <Typography fontSize={12} color="text.secondary">
          Get <b>4 wins</b> to qualify for the next round
        </Typography>
      </Stack>
    </Box>
  );
};
