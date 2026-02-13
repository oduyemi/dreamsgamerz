import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

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
  const [arenaSize, setArenaSize] = useState({ width: 600, height: 400 });
  const [balls, setBalls] = useState<Ball[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [netSwing, setNetSwing] = useState(false);

  const imageSize = 30;
  const circleSize = 260;
  const holeSize = 160;  


  const swishSound = useRef<HTMLAudioElement | null>(null);

  /* ---------- INIT ---------- */

  useEffect(() => {
    if (arenaRef.current) {
      setArenaSize({
        width: arenaRef.current.offsetWidth,
        height: arenaRef.current.offsetHeight,
      });
    }

    swishSound.current = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-basketball-swish-2013.mp3"
    );
  }, []);

  /* ---------- SPAWN BALLS ---------- */

  useEffect(() => {
    if (lives <= 0) return;

    const spawnInterval = setInterval(() => {
      spawnBall();
    }, Math.max(2000 - level * 150, 600)); // difficulty increases

    return () => clearInterval(spawnInterval);
  }, [level, lives]);

  const spawnBall = () => {
    const { width, height } = arenaSize;

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

  /* ---------- HANDLE CLICK ---------- */

  const handleHit = (id: number) => {
    setBalls((prev) => prev.filter((b) => b.id !== id));
    setScore((prev) => {
      const newScore = prev + 1;

      if (newScore % 5 === 0) {
        setLevel((l) => l + 1);
      }

      return newScore;
    });

    if (swishSound.current) {
      swishSound.current.currentTime = 0;
      swishSound.current.play();
    }

    triggerNetSwing();
  };

  /* ---------- FAIL ---------- */

  const handleMiss = (id: number) => {
    setBalls((prev) => prev.filter((b) => b.id !== id));
    onLoseLife();
    triggerNetSwing();
  };

  /* ---------- NET SWING ---------- */

  const triggerNetSwing = () => {
    setNetSwing(true);
    setTimeout(() => setNetSwing(false), 600);
  };

  const centerX = arenaSize.width / 2 - imageSize / 2;
  const centerY = arenaSize.height / 2 - imageSize / 2;

  return (
    <Box
      ref={arenaRef}
      sx={{
        position: "relative",
        width: "100%",
        height: 450,
        mt: 4,
        borderRadius: 4,
        background: "radial-gradient(circle,#f8fafc,#e2e8f0)",
        overflow: "hidden",
      }}
    >
      {/* SCORE */}
      <Typography
        sx={{
          position: "absolute",
          top: 10,
          left: 20,
          fontWeight: 800,
        }}
      >
        Score: {score} | Level: {level}
      </Typography>

      {/* BASKET RIM */}
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
        {/* Rim */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "18px solid #ff6b00",
            boxShadow: "0 0 40px rgba(255,107,0,0.7)",
          }}
        />

        {/* Actual Hole */}
        <Box
          sx={{
            width: holeSize,
            height: holeSize,
            borderRadius: "50%",
            background: "radial-gradient(circle,#000 40%,#111 70%)",
            boxShadow: "inset 0 0 40px rgba(0,0,0,1)",
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
              duration: 3 - level * 0.2,
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
          whileTap={{
            scale: 0.6,
            y: centerY + 20,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 10,
            },
          }}
        />
      ))}

      {lives <= 0 && (
        <Typography
          variant="h4"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontWeight: 900,
            color: "#e63946",
          }}
        >
          GAME OVER
        </Typography>
      )}
    </Box>
  );
};
