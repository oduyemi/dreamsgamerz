import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton
} from '@ionic/react';
import {
  person,
  shieldCheckmarkOutline,
  pencilOutline,
  logOutOutline,
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
    setVideos(prev => [...prev, { id: Date.now(), title: videoTitle, category: videoCategory, monetized: false, views: 0 }]);
    setVideoTitle('');
    setVideoCategory('');
    setUploadOpen(false);
  };

  const totalPoints = videos.reduce((acc, vid) => acc + (vid.monetized ? vid.views * 100 : 0), user.points);
  const coinsFromPoints = Math.floor(totalPoints / 1500) * 100;

  return (
    <IonPage style={{ marginBottom: 60 }}>
      <IonHeader>
        <IonToolbar style={{ backgroundColor: '#1e1e1e', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          <IonTitle style={{ color: '#caa84c', textAlign: 'center', fontWeight: 700, fontSize: isSmall ? '1.2rem' : '1.5rem' }}>
            Creator Dashboard
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ backgroundColor: '#121212' }}>
        <Box px={2} pt={4} maxWidth={500} mx="auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

            {/* Profile Card */}
            <Paper style={{
              padding: 24,
              borderRadius: 16,
              marginBottom: 24,
              backgroundColor: '#1e1e1e',
              background: 'linear-gradient(135deg, rgba(106,69,255,0.15), rgba(106,69,255,0.05))',
              boxShadow: '0 12px 24px rgba(0,0,0,0.25)',
            }}>
              <Stack spacing={2} alignItems="center">
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <IconButton size="small" style={{ backgroundColor: '#caa84c', padding: 4 }}>
                      <IonIcon icon={pencilOutline} style={{ fontSize: 16, color: '#fff' }} />
                    </IconButton>
                  }
                >
                  <Avatar style={{ width: 120, height: 120, backgroundColor: 'rgba(106,69,255,0.2)', border: '3px solid #caa84c', boxShadow: '0 6px 16px rgba(0,0,0,0.2)' }}>
                    <IonIcon icon={person} style={{ fontSize: 56, color: '#caa84c' }} />
                  </Avatar>
                </Badge>

                <Stack direction="row" alignItems="center" spacing={8}>
                  <Typography style={{ fontSize: isSmall ? 20 : 24, fontWeight: 'bold', color: '#ffffff' }}>
                    {user.name}
                  </Typography>
                  {user.verified && <IonIcon icon={shieldCheckmarkOutline} style={{ color: '#4CAF50', fontSize: 20 }} />}
                </Stack>

                <Typography style={{ color: 'rgba(255,255,255,0.8)' }}>{user.email}</Typography>

                {/* Stats Row */}
                <Paper style={{ marginTop: 16, padding: 16, borderRadius: 12, display: 'flex', justifyContent: 'space-around', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  {(['following', 'followers', 'likes'] as const).map((stat: 'following' | 'followers' | 'likes') => (
                    <Box key={stat} style={{ textAlign: 'center' }}>
                      <Typography style={{ fontWeight: 'bold', color: '#ffffff' }}>{user[stat]}</Typography>
                      <Typography style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
                        {stat.charAt(0).toUpperCase() + stat.slice(1)}
                      </Typography>
                    </Box>
                  ))}
                </Paper>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 16 }}>
                  <Chip label={user.membership} size="small" style={{ backgroundColor: 'rgba(106,69,255,0.1)', color: '#caa84c', fontWeight: 600 }} />
                  <Chip label={`Referrals: ${user.referrals}`} size="small" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff' }} />
                </div>

                <Typography style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>{user.joined}</Typography>
              </Stack>
            </Paper>

            {/* Points & Coins Card */}
            <Paper style={{
              padding: 24,
              marginBottom: 24,
              borderRadius: 16,
              backgroundColor: '#1e1e1e',
              background: 'linear-gradient(135deg, rgba(255,206,84,0.15), rgba(255,206,84,0.05))',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: isSmall ? 'column' : 'row',
                gap: 12,
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Chip label={`${totalPoints} pts`} icon={<IonIcon icon={trophyOutline} style={{ fontSize: 16 }} />} style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff' }} />
                <Chip label={`${user.coins} coins`} style={{ backgroundColor: 'rgba(106,69,255,0.1)', color: '#caa84c', fontWeight: 600 }} />
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ borderRadius: 8 }}
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
              </div>
            </Paper>

            {/* Videos Section */}
            <Paper style={{ padding: 16, marginBottom: 24, borderRadius: 16, backgroundColor: '#1e1e1e' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Typography style={{ fontWeight: 'bold', color: '#ffffff' }}>Your Videos</Typography>
                <Button variant="contained" size="small" style={{ borderRadius: 8 }} onClick={() => setUploadOpen(true)}>Upload Video</Button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {videos.map(video => (
                  <Paper key={video.id} style={{
                    padding: 16,
                    borderRadius: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.15)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <Box>
                      <Typography style={{ fontWeight: 500, color: '#ffffff' }}>{video.title}</Typography>
                      <Typography style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
                        {video.category} • {video.monetized ? 'Monetized' : 'Not Monetized'}
                      </Typography>
                    </Box>
                    {video.monetized && <Chip label={`${video.views * 100} pts`} color="primary" size="small" />}
                  </Paper>
                ))}
              </div>
            </Paper>

            {/* Upload Video Modal */}
            <Dialog open={uploadOpen} onClose={() => setUploadOpen(false)}>
              <DialogTitle>Upload Video</DialogTitle>
              <DialogContent>
                <TextField fullWidth label="Video Title" value={videoTitle} onChange={e => setVideoTitle(e.target.value)} style={{ marginBottom: 16 }} />
                <TextField select fullWidth label="Category" value={videoCategory} onChange={e => setVideoCategory(e.target.value)} style={{ marginBottom: 16 }}>
                  {['animations', 'funny', 'short drama', 'inspiring', 'reels'].map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                </TextField>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setUploadOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={handleUploadVideo}>Upload</Button>
              </DialogActions>
            </Dialog>

            {/* Sign Out */}
            <Box style={{ marginTop: 24, textAlign: 'center' }}>
              <IonButton expand="block" fill="clear" color="danger" style={{ '--background-hover': 'rgba(244,67,54,0.1)', fontWeight: 500 }}>
                <IonIcon icon={logOutOutline} slot="start" />
                Sign Out
              </IonButton>
            </Box>

          </motion.div>
        </Box>
      </IonContent>
    </IonPage>
  );
};
