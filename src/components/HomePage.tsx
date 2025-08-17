import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/react';
import {
  notifications,
  eye,
  eyeOff
} from 'ionicons/icons';
import { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Grid,
  Badge
} from '@mui/material';
import "./HomePage.css";
import HomeToken from '/images/hometoken.png';
import VideoSection from "./VideoSection";

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

const getRandomVideos = (count: number) => {
  const shuffled = [...dummyYouTubeVideos].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};


const mapToVideos = (arr: typeof dummyYouTubeVideos) =>
  // const videos = getRandomVideos(12);  // 12 videos for each render
  arr.map((vid) => ({
    id: vid.id,
    title: vid.title,
    thumbnail: `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`,
    youtubeId: vid.youtubeId,
  }));

export const HomePage = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <IonPage>
      <IonHeader className="header">
        <IonToolbar style={{ 
          backgroundColor: '#1A1A1A',
          borderBottom: '1px solid rgba(202, 168, 76, 0.2)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
        }}>
          <IonTitle style={{ 
            color: '#caa84c',
            fontWeight: '700',
            letterSpacing: '1px',
            fontSize: '1.4rem'
          }}>
            Dream Gamers
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ 
        backgroundColor: '#121212', 
        color: '#fff',
      }}>
        {/* Notification Bell with Badge */}
        <IconButton
          aria-label="Notifications"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: '#00BFFF',
            '&:hover': {
              backgroundColor: 'rgba(0, 191, 255, 0.1)'
            }
          }}
          onClick={() => setHasNotifications(false)}
        >
          <Badge 
            color="error" 
            variant="dot" 
            invisible={!hasNotifications}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <IonIcon icon={notifications} style={{ fontSize: '24px' }} />
          </Badge>
        </IconButton>

        {/* Top Balances with Toggle */}
        <Box sx={{ 
          backgroundColor: '#1A1A1A', 
          borderRadius: '16px', 
          p: 2, 
          mx: 2, 
          mt: 2,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}>
          <Grid container justifyContent="space-around">
            {["Game Dollars", "USD Balance", "USD Earned"].map((label, index) => (
              <Grid item key={index}>
                <Stack spacing={0.5} alignItems="center">
                  <Typography fontSize={12} color="rgba(255,255,255,0.6)">{label}</Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography fontWeight="bold" color={index === 0 ? "#caa84c" : "#00BFFF"}>
                      {showBalance ? `$${(index + 1) * 50}` : '••••'}
                    </Typography>
                    {index === 0 && (
                      <IonIcon 
                        icon={showBalance ? eye : eyeOff} 
                        style={{ 
                          fontSize: '16px', 
                          color: 'rgba(255,255,255,0.6)',
                          cursor: 'pointer'
                        }} 
                        onClick={() => setShowBalance(!showBalance)}
                      />
                    )}
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Profile Section */}
        <Box sx={{ 
          backgroundColor: 'rgba(26, 26, 26, 0.7)', 
          borderRadius: '16px', 
          p: 2, 
          mx: 2, 
          mt: 3,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(202, 168, 76, 0.2)'
        }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              src="/images/avatar.png"
              alt="User Avatar"
              sx={{ 
                width: 64, 
                height: 64, 
                border: '2px solid #caa84c',
                boxShadow: '0 0 15px rgba(202, 168, 76, 0.5)'
              }}
            />
            <Stack>
              <Typography variant="h6" fontWeight="bold" color="#caa84c">Dreamer</Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.6)">Level 1 Adventurer</Typography>
              
              {/* Progress Bar */}
              <Box sx={{ 
                width: '100%', 
                height: '6px', 
                backgroundColor: 'rgba(255,255,255,0.1)', 
                borderRadius: '3px',
                mt: 1
              }}>
                <Box sx={{ 
                  width: '30%', 
                  height: '100%', 
                  backgroundColor: '#caa84c',
                  borderRadius: '3px',
                  boxShadow: '0 0 5px rgba(202, 168, 76, 0.7)'
                }} />
              </Box>
              <Typography variant="caption" color="rgba(255,255,255,0.5)" sx={{ mt: 0.5 }}>
                120/400 XP to next level
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Token Section */}
        <Box sx={{ 
          position: 'relative',
          mt: 1,
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Typography variant="h5" fontWeight="bold" color="#caa84c" sx={{ 
            textShadow: '0 0 8px rgba(202, 168, 76, 0.5)'
          }}>
            Dream Tokens
          </Typography>
          
          <Box className="token-wrapper">
            {/* Glow effect */}
            <Box sx={{
              position: 'absolute',
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,191,255,0.3) 0%, transparent 70%)',
              filter: 'blur(10px)',
              animation: 'pulse 3s infinite alternate'
            }} />
            
            <img src={HomeToken} alt="Dreams token" className="token-bouncing" />
            <svg className="curved-text-svg" viewBox="0 0 150 150">
              <defs>
                <path id="textPath" d="M 75,75 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" />
              </defs>
              <text>
                <textPath xlinkHref="#textPath" startOffset="50%" textAnchor="middle">
                  We help you earn money by fulfilling your dreams
                </textPath>
              </text>
            </svg>
          </Box>
          
          <Typography variant="body2" color="rgba(255,255,255,0.7)" sx={{ 
            mt: 2,
            mb: 4,
            textAlign: 'center',
            maxWidth: '80%'
          }}>
            Your current balance: <span style={{ color: '#caa84c', fontWeight: 'bold' }}>1,250 USDT</span>
          </Typography>
        </Box>
        {/* Video sections */}
        <VideoSection title="Latest Content" videos={mapToVideos(dummyYouTubeVideos)} />
        <VideoSection title="Most Viewed" videos={mapToVideos(dummyYouTubeVideos)} />
        <VideoSection title="Recently Viewed" videos={mapToVideos(dummyYouTubeVideos)} />
        <VideoSection title="Content of the Month" videos={mapToVideos(dummyYouTubeVideos)} />
      </IonContent>      
    </IonPage>
  );
};