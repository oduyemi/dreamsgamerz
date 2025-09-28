"use client";
import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Modal,
  useTheme,
} from "@mui/material";
import { heart, chatbubble, paperPlane, ellipsisVertical } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

interface Reel {
  id: number;
  videoUrl: string;
  coverUrl: string;
  username: string;
  caption: string;
  likes: number;
  comments: number;
}

const reelsData: Reel[] = [
  {
    id: 1,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    coverUrl: "https://picsum.photos/id/1015/600/800",
    username: "@oceanview",
    caption: "Chasing sunsets 🌅",
    likes: 128,
    comments: 45,
  },
  {
    id: 2,
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    coverUrl: "https://picsum.photos/id/1011/600/800",
    username: "@traveler",
    caption: "Exploring new cities ✈️",
    likes: 542,
    comments: 78,
  },
  {
    id: 3,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    coverUrl: "https://picsum.photos/id/1025/600/800",
    username: "@foodie",
    caption: "Street food vibes 🍜",
    likes: 891,
    comments: 112,
  },
  {
    id: 4,
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    coverUrl: "https://picsum.photos/id/1019/600/800",
    username: "@naturelover",
    caption: "Mountain hikes 🏔️",
    likes: 310,
    comments: 64,
  }
];

export const ReelsModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const startX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current || startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    isDragging.current = false;
    startX.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current || startX.current === null) return;
    const diff = startX.current - e.clientX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    isDragging.current = false;
    startX.current = null;
  };

  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, reelsData.length - 1));

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        sx={{
          width: { xs: "95%", sm: "80%", md: "70%" },
          height: { xs: "80%", sm: "85%", md: "90%" },
          bgcolor: theme.palette.background.paper,
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
          boxShadow: 24,
          cursor: "grab",
          userSelect: "none",
        }}
      >
        {/* Swipe hints */}
        {currentIndex > 0 && (
          <Typography
            sx={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255,255,255,0.7)",
              fontWeight: "bold",
              fontSize: "1rem",
              userSelect: "none",
            }}
          >
            ← Swipe
          </Typography>
        )}
        {currentIndex < reelsData.length - 1 && (
          <Typography
            sx={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255,255,255,0.7)",
              fontWeight: "bold",
              fontSize: "1rem",
              userSelect: "none",
            }}
          >
            Swipe →
          </Typography>
        )}

        {/* Reels container */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            transition: "transform 0.5s ease",
            transform: `translateX(-${currentIndex * 100}%)`,
            height: "100%",
          }}
        >
          {reelsData.map((reel) => (
            <Box key={reel.id} sx={{ flex: "0 0 100%", height: "100%", position: "relative" }}>
              <video
                src={reel.videoUrl}
                controls
                autoPlay
                loop
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  color: "#fff",
                  textShadow: "0px 2px 6px rgba(0,0,0,0.7)",
                  maxWidth: "70%",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">{reel.username}</Typography>
                <Typography variant="body2">{reel.caption}</Typography>
              </Box>
              <Stack
                direction="column"
                spacing={2}
                sx={{
                  position: "absolute",
                  right: 16,
                  bottom: 80,
                  alignItems: "center",
                }}
              >
                <Box textAlign="center">
                  <IconButton sx={{ bgcolor: "rgba(255,255,255,0.1)" }}>
                    <IonIcon icon={heart} />
                  </IconButton>
                  <Typography fontSize={12} color="white">{reel.likes}</Typography>
                </Box>
                <Box textAlign="center">
                  <IconButton sx={{ bgcolor: "rgba(255,255,255,0.1)" }}>
                    <IonIcon icon={chatbubble} />
                  </IconButton>
                  <Typography fontSize={12} color="white">{reel.comments}</Typography>
                </Box>
                <IconButton sx={{ bgcolor: "rgba(255,255,255,0.1)" }}>
                  <IonIcon icon={paperPlane} />
                </IconButton>
                <IconButton sx={{ bgcolor: "rgba(255,255,255,0.1)" }}>
                  <IonIcon icon={ellipsisVertical} />
                </IconButton>
              </Stack>
            </Box>
          ))}
        </Box>

        {/* Pagination dots */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {reelsData.map((_, idx) => (
            <Box
              key={idx}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: idx === currentIndex ? theme.palette.primary.main : "rgba(255,255,255,0.5)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </Stack>
      </Box>
    </Modal>
  );
};
