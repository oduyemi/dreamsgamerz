import { Box, Typography, Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
}

const dummyVideos: Video[] = [
  { id: 1, title: 'Epic Travel Vlog', thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg', channel: 'Traveler Life', views: '1.2M views' },
  { id: 2, title: 'Top 10 Animation Shorts', thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg', channel: 'Animax', views: '850K views' },
  { id: 3, title: 'Funny Cat Compilation', thumbnail: 'https://img.youtube.com/vi/J---aiyznGQ/hqdefault.jpg', channel: 'Cat Lovers', views: '2.5M views' },
  { id: 4, title: 'Motivational Short Drama', thumbnail: 'https://img.youtube.com/vi/tgbNymZ7vqY/hqdefault.jpg', channel: 'Inspire Daily', views: '940K views' },
];

export const TrendingVideosSection = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box style={{ backgroundColor: '#fff', marginTop:"20px", padding: isSmall ? 2 : 4, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', marginBottom: 24 }}>
      {/* Heading */}
      <Typography style={{ fontWeight: 700, fontSize: isSmall ? 20 : 24, marginBottom: 4, color: '#1a1a1a' }}>
        Trending Videos
      </Typography>
      <Typography style={{ color: '#555', fontSize: 14, marginBottom: 16 }}>
        Watch the hottest videos gaining traction right now. Stay updated with the latest trends and top creators.
      </Typography>

      {/* Video Grid */}
      <Grid container spacing={2}>
        {dummyVideos.map(video => (
          <Grid item xs={12} sm={6} md={3} key={video.id}>
            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
              <Paper style={{ borderRadius: 12, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                <img src={video.thumbnail} alt={video.title} style={{ width: '100%', display: 'block', height: isSmall ? 140 : 160, objectFit: 'cover' }} />
                <Box style={{ padding: 8 }}>
                  <Typography style={{ fontWeight: 600, fontSize: 14, color: '#1a1a1a', marginBottom: 4 }} noWrap>
                    {video.title}
                  </Typography>
                  <Typography style={{ fontSize: 12, color: '#777' }} noWrap>
                    {video.channel} • {video.views}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
