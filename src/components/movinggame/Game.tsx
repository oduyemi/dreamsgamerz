import { Box, Typography } from "@mui/material";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const MovingGame = () => {
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hit, setHit] = useState(false);

  // Generate random positions within viewport
  const getRandomPosition = () => {
    const padding = 90; // keeps image fully visible
    const width = window.innerWidth - padding;
    const height = window.innerHeight - padding;

    return {
      x: Math.random() * width,
      y: Math.random() * height,
    };
  };

  useEffect(() => {
    if (!hit) {
      const moveRandomly = async () => {
        while (!hit) {
          await controls.start({
            ...getRandomPosition(),
            transition: {
              duration: 0.8, // FAST pace
              ease: "linear",
            },
          });
        }
      };
      moveRandomly();
    }
  }, [controls, hit]);

  const handleHit = () => {
    setHit(true);
    controls.stop();
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: "100dvh",
        background: "#ffffff",
        position: "relative",
        overflow: "hidden",
        touchAction: "manipulation",
      }}
    >
      {/* Center Vertical Guide */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 2,
          background:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.15), transparent)",
        }}
      />

      {/* Center Dot */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#caa84c",
          boxShadow: "0 0 12px rgba(202,168,76,0.6)",
          zIndex: 2,
        }}
      />

      {/* Moving Target */}
      <motion.div
        animate={controls}
        onClick={handleHit}
        style={{
          position: "absolute",
          cursor: "pointer",
          zIndex: 3,
        }}
      >
        <Box
          sx={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            padding: "4px",
            background: hit
              ? "linear-gradient(135deg, #4caf50, #81c784)"
              : "linear-gradient(135deg, #caa84c, #f7dc8a)",
            boxShadow: hit
              ? "0 0 30px rgba(76,175,80,0.7)"
              : "0 0 30px rgba(202,168,76,0.6)",
            transition: "all 0.25s ease",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <img
              src="/images/avatar.png"
              alt="Moving target"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </motion.div>

      {/* Status Text */}
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          width: "100%",
          textAlign: "center",
          px: 2,
          zIndex: 4,
        }}
      >
        {!hit ? (
          <Typography
            fontSize={14}
            fontWeight={500}
            sx={{ color: "#666" }}
          >
            Tap the moving image
          </Typography>
        ) : (
          <Typography
            fontSize={16}
            fontWeight={800}
            sx={{ color: "#4caf50" }}
          >
            🎯 Hit!
          </Typography>
        )}
      </Box>
    </Box>
  );
};
