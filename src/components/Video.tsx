import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonIcon
} from '@ionic/react';
import { useState } from 'react';
import "./Video.css";
import VideoSection from "./VideoSection";
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useHistory, useLocation } from 'react-router';
import { gameController, home, image, person, wallet } from 'ionicons/icons';
import { Reels } from './Reels';


// "dQw4w9WgXcQ", "kXYiU_JCYtU", "3JZ_D3ELwOQ", "l482T0yNkeo", "eY52Zsg-KVI",
//   "9bZkp7q19f0", "tVj0ZTS4WF4", "60ItHLz5WEA", "RgKAFK5djSk", "pRpeEdMmmQ0",
//   "fRh_vgS2dFE", "hT_nvWreIhg", "OPf0YbXqDm0", "M7FIvfx5J10", "uelHwf8o7_U",
//   "2Vv-BfVoq4g", "QtXby3twMmI", "JGwWNGJdvx8", "kJQP7kiw5Fk", "ktvTqknDobU",
//   "rYEDA3JcQqw", "2vjPBrBU-TM", "YQHsXMglC9A", "YykjpeuMNEk", "lp-EO5I60KA",
//   "SlPhMPnQ58k", "fLexgOxsZu0", "iS1g8G_njx8", "bESGLojNYSo", "xTlNMmZKwpA",

// Dummy videos
const dummyYouTubeVideos = [
  { id: 1, title: "Epic Gameplay", youtubeId: "dQw4w9WgXcQ" },
  { id: 2, title: "Strategy Tips", youtubeId: "9bZkp7q19f0" },
  { id: 3, title: "Top 10 Moments", youtubeId: "3JZ_D3ELwOQ" },
  { id: 4, title: "Funny Highlights", youtubeId: "L_jWHffIx5E" },
  { id: 5, title: "New Trailer", youtubeId: "fJ9rUzIMcZQ" },
  { id: 6, title: "Best Plays", youtubeId: "CevxZvSJLk8" },
  { id: 7, title: "Epic Gameplay", youtubeId: "dQw4w9WgXcQ" },
  { id: 8, title: "Strategy Tips", youtubeId: "kXYiU_JCYtU" },
  { id: 9, title: "Top 10 Moments", youtubeId: "l482T0yNkeo" },
  { id: 10, title: "Funny Highlights", youtubeId: "tVj0ZTS4WF4" },
  { id: 11, title: "New Trailer", youtubeId: "60ItHLz5WEA" },
  { id: 12, title: "Best Plays", youtubeId: "RgKAFK5djSk" },
  { id: 13, title: "Epic Gameplay", youtubeId: "pRpeEdMmmQ0" },
  { id: 14, title: "Strategy Tips", youtubeId: "fRh_vgS2dFE" },
  { id: 14, title: "Top 10 Moments", youtubeId: "hT_nvWreIhg" },
  { id: 15, title: "Funny Highlights", youtubeId: "OPf0YbXqDm0" },
  { id: 16, title: "New Trailer", youtubeId: "M7FIvfx5J10" },
  { id: 17, title: "Best Plays", youtubeId: "uelHwf8o7_U" },
  { id: 18, title: "Epic Gameplay", youtubeId: "2Vv-BfVoq4g" },
  { id: 19, title: "Strategy Tips", youtubeId: "QtXby3twMmI" },
  { id: 20, title: "Top 10 Moments", youtubeId: "JGwWNGJdvx8" },
  { id: 21, title: "Funny Highlights", youtubeId: "kJQP7kiw5Fk" },
  { id: 22, title: "New Trailer", youtubeId: "ktvTqknDobU" },
  { id: 23, title: "Best Plays", youtubeId: "rYEDA3JcQqw" },
  { id: 24, title: "Epic Gameplay", youtubeId: "2vjPBrBU-TM" },
  { id: 25, title: "Strategy Tips", youtubeId: "YQHsXMglC9A" },
  { id: 26, title: "Top 10 Moments", youtubeId: "YykjpeuMNEk" },
  { id: 27, title: "Funny Highlights", youtubeId: "lp-EO5I60KA" },
  { id: 28, title: "New Trailer", youtubeId: "SlPhMPnQ58k" },
  { id: 29, title: "Best Plays", youtubeId: "fLexgOxsZu0" },
  { id: 30, title: "Epic Gameplay", youtubeId: "iS1g8G_njx8" },
];

// const getRandomVideos = (count: number) => {
//   const shuffled = [...dummyYouTubeVideos].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, count);
// };


const mapToVideos = (arr: typeof dummyYouTubeVideos) =>
  // const videos = getRandomVideos(12);  // 12 videos for each render
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
      <IonHeader className="header">
        <IonToolbar style={{ 
          backgroundColor: "#fff",
          borderBottom: '1px solid rgba(202, 168, 76, 0.2)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
        }}>
          <IonTitle style={{ 
            color: '#caa84c',
            fontWeight: '700',
            letterSpacing: '1px',
            fontSize: '1.4rem'
          }}>
            Videos
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ 
        backgroundColor: '#fff', 
        color: '#121212',
      }}>
        {/* Reels */}
            <Reels />
        {/* Video sections */}
        <VideoSection title="Most Viewed" videos={mapToVideos(dummyYouTubeVideos)} />
        <VideoSection title="Recently Viewed" videos={mapToVideos(dummyYouTubeVideos)} />
        <VideoSection title="Recently Viewed" videos={mapToVideos(dummyYouTubeVideos)} />
        <VideoSection title="Content of the Month" videos={mapToVideos(dummyYouTubeVideos)} />
      </IonContent>    
      <IonFooter>
        <Box
          display="flex"
          justifyContent="space-around"
          px={2}
          py={1.5}
          sx={{
            bgcolor: '#1A1A1A',
            borderRadius: '16px 16px 0 0',
            boxShadow: 'var(--shadow-lg)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
                <Box>
                    <Stack key={i} alignItems="center" spacing={0.5}>
                        <IconButton
                        sx={{
                            color: isActive ? 'var(--accent-gold)' : 'rgba(255,255,255,0.7)',
                            p: 1.5,
                            transition: 'all 0.25s ease',
                            '&:hover': {
                            color: isActive ? 'var(--accent-gold)' : '#00BFFF',
                            transform: 'scale(1.15)',
                            background: 'rgba(255,255,255,0.05)',
                            },
                        }}
                        onClick={() => history.push(item.path)}
                        >
                        <IonIcon icon={item.icon} style={{ fontSize: '22px' }} />
                        </IconButton>
                        <Typography
                        fontSize={10.5}
                        sx={{
                            color: isActive ? 'var(--accent-gold)' : 'rgba(255,255,255,0.6)',
                            fontWeight: isActive ? '600' : '400',
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                        }}
                        >
                        {item.label}
                        </Typography>
                    </Stack>
                </Box>
            );
          })}
        </Box>
      </IonFooter>  
    </IonPage>
  );
};