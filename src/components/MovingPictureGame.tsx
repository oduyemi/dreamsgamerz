import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

interface GameArenaProps {
  lives: number;
  onLoseLife: () => void;
}

interface Ball {
  id: number;
  startX: number;
  startY: number;
}

export const GameArena: React.FC<GameArenaProps> = ({
  lives,
  onLoseLife,
}) => {
  const arenaRef = useRef<HTMLDivElement>(null);
  const swishSound = useRef<HTMLAudioElement | null>(null);

  const [arenaSize, setArenaSize] = useState({ width: 0, height: 0 });
  const [balls, setBalls] = useState<Ball[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  /* ---------- RESPONSIVE SIZES ---------- */

  const imageSize = Math.max(24, arenaSize.width * 0.05);
  const circleSize = Math.min(arenaSize.width * 0.5, 320);
  const holeSize = circleSize * 0.6;

  /* ---------- INIT & RESIZE ---------- */

  useEffect(() => {
    if (!arenaRef.current) return;
  
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setArenaSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
  
    observer.observe(arenaRef.current);
  
    swishSound.current = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-basketball-swish-2013.mp3"
    );
  
    return () => observer.disconnect();
  }, []);
  

  /* ---------- SPAWN BALLS ---------- */

  useEffect(() => {
    if (lives <= 0) return;

    const spawnInterval = setInterval(() => {
      spawnBall();
    }, Math.max(2000 - level * 150, 600));

    return () => clearInterval(spawnInterval);
  }, [level, lives, arenaSize]);

  const spawnBall = () => {
    const { width, height } = arenaSize;
    if (!width || !height) return;

    const edge = Math.floor(Math.random() * 4);
    let startX = 0;
    let startY = 0;

    if (edge === 0) {
      startX = Math.random() * width;
      startY = -imageSize;
    } else if (edge === 1) {
      startX = width + imageSize;
      startY = Math.random() * height;
    } else if (edge === 2) {
      startX = Math.random() * width;
      startY = height + imageSize;
    } else {
      startX = -imageSize;
      startY = Math.random() * height;
    }

    setBalls((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), startX, startY },
    ]);
  };

  /* ---------- GAME LOGIC ---------- */

  const handleHit = (id: number) => {
    setBalls((prev) => prev.filter((b) => b.id !== id));

    setScore((prev) => {
      const newScore = prev + 1;
      if (newScore % 5 === 0) setLevel((l) => l + 1);
      return newScore;
    });

    swishSound.current?.play();
  };

  const handleMiss = (id: number) => {
    setBalls((prev) => prev.filter((b) => b.id !== id));
    onLoseLife();
  };

  const centerX = arenaSize.width / 2 - imageSize / 2;
  const centerY = arenaSize.height / 2 - imageSize / 2;

  return (
    <Box
      ref={arenaRef}
      sx={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        background:
          "radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)",
        overflow: "hidden",
      }}
    >
      {/* HUD */}
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          right: 20,
          px: 3,
          py: 1.5,
          borderRadius: 3,
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.08)",
          color: "#fff",
        }}
      >
        <Typography fontWeight={700}>
          Score: {score}
        </Typography>

        <Typography fontWeight={700}>
          Level: {level}
        </Typography>

        <Typography fontWeight={700}>
          Lives: {lives}
        </Typography>
      </Stack>

      {/* RIM */}
      <Box
        sx={{
          position: "absolute",
          width: circleSize,
          height: circleSize,
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "16px solid #ff6b00",
            boxShadow: "0 0 40px rgba(255,107,0,0.6)",
          }}
        />

        <Box
          sx={{
            width: holeSize,
            height: holeSize,
            borderRadius: "50%",
            background: "#000",
          }}
        />
      </Box>

      {/* BALLS */}
      {balls.map((ball) => (
        <motion.img
          key={ball.id}
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png"
          initial={{ x: ball.startX, y: ball.startY }}
          animate={{
            x: centerX,
            y: centerY,
            transition: {
              duration: Math.max(3 - level * 0.2, 1),
              ease: "linear",
            },
          }}
          onAnimationComplete={() => handleMiss(ball.id)}
          onClick={() => handleHit(ball.id)}
          style={{
            position: "absolute",
            width: imageSize,
            height: imageSize,
            cursor: "pointer",
          }}
          whileTap={{ scale: 0.7 }}
        />
      ))}

      {/* GAME OVER */}
      <AnimatePresence>
        {lives <= 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{ color: "#ff4d4d", fontWeight: 900 }}
            >
              GAME OVER
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
