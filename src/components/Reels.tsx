import React from "react";
import { IonIcon } from "@ionic/react";
import {
  heart,
  chatbubble,
  paperPlane,
  ellipsisVertical,
} from "ionicons/icons";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import "./Reels.css";

const reelsData = [
  {
    id: 1,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    username: "@oceanview",
    caption: "Chasing sunsets 🌅",
    likes: 128,
    comments: 45,
  },
  {
    id: 2,
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    username: "@traveler",
    caption: "Exploring new cities ✈️",
    likes: 542,
    comments: 78,
  },
  {
    id: 3,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    username: "@foodie",
    caption: "Street food vibes 🍜",
    likes: 891,
    comments: 112,
  },
  {
    id: 4,
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    username: "@naturelover",
    caption: "Mountain hikes 🏔️",
    likes: 310,
    comments: 64,
  },
];

export const Reels: React.FC = () => {
  return (
    <Box className="reels-wrapper">
      <Typography variant="h4" className="reels-heading">
        Reels
      </Typography>

      <Box className="reels-scroll-container">
        {reelsData.map((reel) => (
          <Box key={reel.id} className="reel-card">
            <video
              src={reel.videoUrl}
              autoPlay
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
            <Stack className="reel-actions" spacing={1}>
              <IconButton sx={{ color: "#fff" }}>
                <IonIcon icon={heart} style={{ fontSize: "22px" }} />
              </IconButton>
              <Typography fontSize={12}>{reel.likes}</Typography>

              <IconButton sx={{ color: "#fff" }}>
                <IonIcon icon={chatbubble} style={{ fontSize: "20px" }} />
              </IconButton>
              <Typography fontSize={12}>{reel.comments}</Typography>

              <IconButton sx={{ color: "#fff" }}>
                <IonIcon icon={paperPlane} style={{ fontSize: "20px" }} />
              </IconButton>

              <IconButton sx={{ color: "#fff" }}>
                <IonIcon icon={ellipsisVertical} style={{ fontSize: "18px" }} />
              </IconButton>
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
