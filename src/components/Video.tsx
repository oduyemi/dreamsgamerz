import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonIcon,
} from "@ionic/react";
import { useState } from "react";
import { VideoSection } from "./VideoSection";
import { Box, IconButton, Stack, Typography, Paper } from "@mui/material";
import { useHistory, useLocation } from "react-router";
import { gameController, home, image, person, wallet } from "ionicons/icons";
import { VideoHeader } from "./VideoHeader";

// Dummy videos
const dummyYouTubeVideos = [
  { id: 1, title: "Epic Gameplay", youtubeId: "dQw4w9WgXcQ" },
  { id: 2, title: "Strategy Tips", youtubeId: "9bZkp7q19f0" },
  { id: 3, title: "Top 10 Moments", youtubeId: "3JZ_D3ELwOQ" },
  { id: 4, title: "Funny Highlights", youtubeId: "L_jWHffIx5E" },
  { id: 5, title: "New Trailer", youtubeId: "fJ9rUzIMcZQ" },
  { id: 6, title: "Best Plays", youtubeId: "CevxZvSJLk8" },
];

const mapToVideos = (arr: typeof dummyYouTubeVideos) =>
  arr.map((vid) => ({
    id: vid.id,
    title: vid.title,
    thumbnail: `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`,
    youtubeId: vid.youtubeId,
  }));

export const VideoPage = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [hasNotifications, setHasNotifications] = useState(true);
  const history = useHistory();
  const location = useLocation();

  const navItems = [
    { label: "Home", icon: home, path: "/" },
    { label: "Games", icon: gameController, path: "/games" },
    { label: "Videos", icon: image, path: "/videos" },
    { label: "Wallet", icon: wallet, path: "/wallet" },
    { label: "Me", icon: person, path: "/profile" },
  ];

  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar
          style={{
            backgroundColor: "#fff",
            borderBottom: "1px solid rgba(202, 168, 76, 0.2)",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
          }}
        >
          <IonTitle
            style={{
              color: "#caa84c",
              fontWeight: 700,
              letterSpacing: "0.5px",
              fontSize: "1.35rem",
            }}
          >
            Videos
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Content */}
      <IonContent fullscreen style={{ backgroundColor: "#fff" }}>
        <VideoHeader />

        {/* Sections */}
        <VideoSection
          title="Most Viewed"
          videos={mapToVideos(dummyYouTubeVideos)}
        />
        <VideoSection
          title="Recently Viewed"
          videos={mapToVideos(dummyYouTubeVideos)}
        />
        <VideoSection
          title="Trending Now"
          videos={mapToVideos(dummyYouTubeVideos)}
        />
        <VideoSection
          title="Content of the Month"
          videos={mapToVideos(dummyYouTubeVideos)}
        />
      </IonContent>

      {/* Bottom Nav */}
      <IonFooter>
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            px: 2,
            py: 1.2,
            borderRadius: "16px 16px 0 0",
            bgcolor: "#fff",
            borderTop: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <Stack key={i} alignItems="center" spacing={0.5}>
                <IconButton
                  sx={{
                    color: isActive ? "#caa84c" : "rgba(0,0,0,0.6)",
                    p: 1.5,
                    transition: "all 0.25s ease",
                    "&:hover": {
                      color: "#e65d0f",
                      transform: "scale(1.15)",
                      background: "rgba(0,0,0,0.04)",
                    },
                  }}
                  onClick={() => history.push(item.path)}
                >
                  <IonIcon icon={item.icon} style={{ fontSize: "22px" }} />
                </IconButton>
                <Typography
                  fontSize={10.5}
                  sx={{
                    color: isActive ? "#caa84c" : "rgba(0,0,0,0.6)",
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: "0.4px",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </Typography>
              </Stack>
            );
          })}
        </Paper>
      </IonFooter>
    </IonPage>
  );
};
