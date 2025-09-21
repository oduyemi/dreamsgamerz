"use client";
import React, { useRef, useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { heart, chatbubble, paperPlane, ellipsisVertical, playCircle } from "ionicons/icons";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import "./Reels.css";

const reelsData = [
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
  },
];

export const Reels: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollX(container.scrollLeft);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box className="reels-wrapper">
      <Box className="reels-header">
        <Typography variant="h4" className="reels-heading-left">
          Latest Hot Content
        </Typography>
        <Typography variant="subtitle1" className="reels-subheading-left">
          Watch short videos from your favorite creators
        </Typography>

        {/* Particles */}
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
      </Box>

      <Box className="reels-scroll-container" ref={scrollRef}>
        {reelsData.map((reel, index) => {
          const cardOffset = 320 * index;
          const distance = scrollX - cardOffset;
          const scale = 1 - Math.min(Math.abs(distance) / 1000, 0.2);
          const translateY = Math.min(Math.abs(distance) / 10, 20);

          return (
            <Box
              key={reel.id}
              className="reel-card"
              style={{
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              {/* Cover Image */}
              <img src={reel.coverUrl} alt="cover" className="reel-cover" />

              {/* Play Icon */}
              <IonIcon icon={playCircle} className="reel-play-icon" />

              {/* Video (only plays on hover) */}
              <video
                src={reel.videoUrl}
                loop
                muted
                playsInline
                className="reel-video"
              />

              {/* Overlay Content */}
              <Box className="reel-overlay">
                <Typography fontWeight="bold">{reel.username}</Typography>
                <Typography fontSize={14}>{reel.caption}</Typography>
              </Box>

              {/* Right-side Action Buttons */}
              <Stack className="reel-actions">
                <Box textAlign="center">
                  <IconButton className="reel-action-btn">
                    <IonIcon icon={heart} />
                  </IconButton>
                  <Typography fontSize={12}>{reel.likes}</Typography>
                </Box>

                <Box textAlign="center">
                  <IconButton className="reel-action-btn">
                    <IonIcon icon={chatbubble} />
                  </IconButton>
                  <Typography fontSize={12}>{reel.comments}</Typography>
                </Box>

                <IconButton className="reel-action-btn">
                  <IonIcon icon={paperPlane} />
                </IconButton>

                <IconButton className="reel-action-btn">
                  <IonIcon icon={ellipsisVertical} />
                </IconButton>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
