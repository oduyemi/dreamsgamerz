import { Box, Typography } from '@mui/material';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';

export const MovingGame = () => {
  const controls = useAnimationControls();
  const [hit, setHit] = useState(false);

  useEffect(() => {
    if (!hit) {
      controls.start({
        y: ['100%', '-120%'],
        transition: {
          duration: 3,
          ease: 'linear',
          repeat: Infinity,
        },
      });
    }
  }, [hit, controls]);

  const handleHit = () => {
    setHit(true);
    controls.stop();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at center, #fdf6df 0%, #eef1f7 60%, #e4e7ee 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      {/* Phone Frame */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 390,
          height: 700,
          borderRadius: 6,
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(245,246,250,0.85))',
          border: '1px solid rgba(202,168,76,0.35)',
          boxShadow: '0 30px 70px rgba(0,0,0,0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Vertical Path (visual guide like the arrows in sketch) */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 2,
            background:
              'linear-gradient(to top, transparent, rgba(202,168,76,0.35), transparent)',
          }}
        />

        {/* Moving Target */}
        <motion.div
          animate={controls}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 0,
            transform: 'translateX(-50%)',
            cursor: 'pointer',
          }}
          onClick={handleHit}
        >
          <Box
            sx={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              padding: '5px',
              background:
                hit
                  ? 'linear-gradient(135deg, #4caf50, #81c784)'
                  : 'linear-gradient(135deg, #caa84c, #f7dc8a)',
              boxShadow:
                hit
                  ? '0 0 35px rgba(76,175,80,0.8)'
                  : '0 0 35px rgba(202,168,76,0.8)',
              transition: 'all 0.3s ease',
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
                alt="Moving target"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Box>
        </motion.div>

        {/* Status Text */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 24,
            width: '100%',
            textAlign: 'center',
          }}
        >
          {!hit ? (
            <Typography fontSize={14} color="text.secondary">
              Tap the moving image
            </Typography>
          ) : (
            <Typography
              fontSize={16}
              fontWeight={700}
              color="success.main"
            >
              🎯 Hit!
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};
