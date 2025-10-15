import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon
} from '@ionic/react';
import {
  person,
  shieldCheckmarkOutline,
  pencilOutline,
  trophyOutline
} from 'ionicons/icons';
import {
  Stack,
  Typography,
  Avatar,
  IconButton,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
  Badge,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const Profile = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    membership: 'Premium',
    points: 1250,
    coins: 0,
    following: 150,
    followers: 320,
    likes: 450,
    referrals: 12,
    joined: 'Member since Jan 2023',
    verified: true
  });

  const [videos, setVideos] = useState([
    { id: 1, title: 'Funny Cat Compilation', category: 'funny', monetized: true, views: 25 },
    { id: 2, title: 'Short Drama Scene', category: 'short drama', monetized: false, views: 0 }
  ]);

  const [uploadOpen, setUploadOpen] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoCategory, setVideoCategory] = useState('');

  const handleUploadVideo = () => {
    if (!videoTitle || !videoCategory) return alert('Please enter title and category.');
    setVideos(prev => [...prev, {
      id: Date.now(),
      title: videoTitle,
      category: videoCategory,
      monetized: false,
      views: 0
    }]);
    setVideoTitle('');
    setVideoCategory('');
    setUploadOpen(false);
  };

  const totalPoints = videos.reduce((acc, vid) =>
    acc + (vid.monetized ? vid.views * 100 : 0), user.points);
  const coinsFromPoints = Math.floor(totalPoints / 1500) * 100;

  return (
    <IonPage style={{ backgroundColor: '#ffffff', marginBottom: 60 }}>
      <IonHeader>
        <IonToolbar
          style={{
            backgroundColor: '#111',
            borderBottom: '1px solid rgba(202,168,76,0.2)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
        >
          <IonTitle
            style={{
              color: '#caa84c',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: isSmall ? '1.2rem' : '1.5rem'
            }}
          >
            Creator Dashboard
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className='bgwhite'>
        <Box className="bgwhite">
          <Box px={2} pt={4} pb={6} maxWidth={500} mx="auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Profile Card */}
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  mb: 3,
                  backgroundColor: '#fff',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(202,168,76,0.2)'
                }}
              >
                <Stack spacing={2} alignItems="center">
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <IconButton size="small" sx={{ backgroundColor: '#caa84c', p: 0.5 }}>
                        <IonIcon icon={pencilOutline} style={{ fontSize: 16, color: '#fff' }} />
                      </IconButton>
                    }
                  >
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        backgroundColor: 'rgba(202,168,76,0.1)',
                        border: '3px solid #caa84c',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
                      }}
                    >
                      <IonIcon icon={person} style={{ fontSize: 56, color: '#caa84c' }} />
                    </Avatar>
                  </Badge>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      sx={{
                        fontSize: isSmall ? 20 : 24,
                        fontWeight: 'bold',
                        color: '#222'
                      }}
                    >
                      {user.name}
                    </Typography>
                    {user.verified && (
                      <IonIcon icon={shieldCheckmarkOutline} style={{ color: '#4CAF50', fontSize: 20 }} />
                    )}
                  </Stack>

                  <Typography sx={{ color: 'text.secondary' }}>{user.email}</Typography>

                  {/* Stats Row */}
                  <Paper
                    sx={{
                      mt: 2,
                      p: 2,
                      borderRadius: 2,
                      display: 'flex',
                      justifyContent: 'space-around',
                      backgroundColor: 'rgba(202,168,76,0.05)'
                    }}
                  >
                    {(['following', 'followers', 'likes'] as const).map((stat) => (
                      <Box key={stat} textAlign="center">
                        <Typography fontWeight="bold" color="#caa84c">
                          {user[stat]}
                        </Typography>
                        <Typography fontSize={12} color="text.secondary">
                          {stat.charAt(0).toUpperCase() + stat.slice(1)}
                        </Typography>
                      </Box>
                    ))}
                  </Paper>

                  <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" mt={2}>
                    <Chip
                      label={user.membership}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(202,168,76,0.15)',
                        color: '#caa84c',
                        fontWeight: 600
                      }}
                    />
                    <Chip
                      label={`Referrals: ${user.referrals}`}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(0,0,0,0.05)',
                        color: '#333'
                      }}
                    />
                  </Stack>

                  <Typography
                    fontSize={12}
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {user.joined}
                  </Typography>
                </Stack>
              </Paper>

              {/* Points & Coins Card */}
              <Paper
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 3,
                  backgroundColor: '#fff',
                  border: '1px solid rgba(202,168,76,0.2)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
              >
                <Stack
                  direction={isSmall ? 'column' : 'row'}
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Chip
                    label={`${totalPoints} pts`}
                    icon={<IonIcon icon={trophyOutline} style={{ fontSize: 16 }} />}
                    sx={{
                      backgroundColor: 'rgba(202,168,76,0.1)',
                      color: '#caa84c',
                      fontWeight: 600
                    }}
                  />
                  <Chip
                    label={`${user.coins} coins`}
                    sx={{
                      backgroundColor: 'rgba(202,168,76,0.1)',
                      color: '#caa84c',
                      fontWeight: 600
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#caa84c',
                      color: '#fff',
                      borderRadius: 2,
                      '&:hover': { backgroundColor: '#b79535' }
                    }}
                    onClick={() => {
                      if (coinsFromPoints > 0) {
                        setUser(prev => ({ ...prev, coins: prev.coins + coinsFromPoints }));
                        setVideos(prev => prev.map(v => ({ ...v, monetized: false, views: 0 })));
                        alert(`Converted ${coinsFromPoints} coins!`);
                      } else alert("Need 1500 points for 100 coins.");
                    }}
                  >
                    Convert Points to Coins
                  </Button>
                </Stack>
              </Paper>

              {/* Videos Section */}
              <Paper
                sx={{
                  p: 2,
                  mb: 3,
                  borderRadius: 3,
                  backgroundColor: '#fff',
                  border: '1px solid rgba(202,168,76,0.2)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography fontWeight="bold" color="#333">
                    Your Videos
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      borderRadius: 2,
                      backgroundColor: '#caa84c',
                      '&:hover': { backgroundColor: '#b79535' }
                    }}
                    onClick={() => setUploadOpen(true)}
                  >
                    Upload Video
                  </Button>
                </Stack>

                <Stack spacing={1}>
                  {videos.map(video => (
                    <Paper
                      key={video.id}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'rgba(202,168,76,0.05)',
                        cursor: 'pointer',
                        transition: '0.2s',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0 6px 16px rgba(0,0,0,0.08)'
                        }
                      }}
                    >
                      <Box>
                        <Typography fontWeight={500} color="#222">
                          {video.title}
                        </Typography>
                        <Typography fontSize={12} color="text.secondary">
                          {video.category} • {video.monetized ? 'Monetized' : 'Not Monetized'}
                        </Typography>
                      </Box>
                      {video.monetized && (
                        <Chip
                          label={`${video.views * 100} pts`}
                          color="primary"
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(202,168,76,0.1)',
                            color: '#caa84c'
                          }}
                        />
                      )}
                    </Paper>
                  ))}
                </Stack>
              </Paper>

              {/* Upload Video Dialog */}
              <Dialog open={uploadOpen} onClose={() => setUploadOpen(false)}>
                <DialogTitle>Upload Video</DialogTitle>
                <DialogContent>
                  <TextField
                    fullWidth
                    label="Video Title"
                    value={videoTitle}
                    onChange={e => setVideoTitle(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Category"
                    value={videoCategory}
                    onChange={e => setVideoCategory(e.target.value)}
                  >
                    {['animations', 'funny', 'short drama', 'inspiring', 'reels'].map(cat => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </TextField>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setUploadOpen(false)}>Cancel</Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#caa84c',
                      color: '#fff',
                      '&:hover': { backgroundColor: '#b79535' }
                    }}
                    onClick={handleUploadVideo}
                  >
                    Upload
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Sign Out */}
              <Box mt={4} textAlign="center">
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.2,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    boxShadow: '0 4px 12px rgba(244,67,54,0.2)'
                  }}
                >
                  Sign Out
                </Button>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};
