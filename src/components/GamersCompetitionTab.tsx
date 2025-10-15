import { Box, Button, Typography, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { trophyOutline, timeOutline, gameControllerOutline, sparklesOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import token from '/images/token.png';
import { IonIcon } from '@ionic/react';

interface Competition {
  id: number;
  image?: string;
  title: string;
  description: string;
  highlight?: boolean;
  comingSoon?: boolean;
  link?: string;
  prize?: string;
}

const competitions: Competition[] = [
  { 
    id: 1, 
    image: token, 
    title: "Moving Picture", 
    description: "Test your reflexes with this fast-paced image matching game",
    highlight: true, 
    link: "/games/moving-picture",
    prize: "500 Tokens"
  },
  { 
    id: 2, 
    comingSoon: true,
    title: "Memory Challenge",
    description: "Coming soon: An exciting memory-based competition",
  },
  { 
    id: 3, 
    comingSoon: true,
    title: "Speed Typing",
    description: "Coming soon: Prove your typing speed against others",
  },
];

export const GamersCompetitionTab: React.FC = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      sx={{ bgcolor: '#fff', minHeight: '100vh', p: 2 }}
    >
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h4"
          component={motion.h1}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          fontWeight={700}
          mb={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
        >
          <IonIcon icon={gameControllerOutline} style={{ fontSize: 28 }} />
          Gamers Arena
        </Typography>
        <Typography
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          color="text.secondary"
          maxWidth={600}
          mx="auto"
        >
          Compete against players worldwide and win amazing prizes
        </Typography>
      </Box>

      {/* Competition Grid */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }}
        gap={3}
      >
        <AnimatePresence>
          {competitions.map((item, index) => (
            <Box
              key={item.id}
              component={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, boxShadow: "0px 6px 20px rgba(0, 191, 255, 0.25)" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              display="flex"
            >
              <Paper
                elevation={4}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  p: 2,
                  height: '100%', // makes all cards equal height
                  background: item.highlight
                    ? 'linear-gradient(145deg, #e0f7ff, #f0f9ff)'
                    : item.comingSoon
                    ? '#f5f5f5'
                    : '#fff',
                }}
              >
                {item.image && (
                  <Box
                    component={Link}
                    to={item.link || '#'}
                    mb={2}
                    textAlign="center"
                  >
                    <Box
                      component={motion.img}
                      src={item.image}
                      alt={item.title}
                      sx={{ maxWidth: '100%', height: 160, borderRadius: 2, objectFit: 'contain' }}
                      whileHover={{ scale: 1.05 }}
                    />
                    {item.prize && (
                      <Box
                        sx={{
                          mt: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.5,
                          px: 2,
                          py: 0.5,
                          bgcolor: 'gold',
                          borderRadius: 3,
                          fontWeight: 600,
                          fontSize: 12,
                        }}
                      >
                        <IonIcon icon={trophyOutline} />
                        {item.prize}
                      </Box>
                    )}
                  </Box>
                )}

                <Typography
                  variant="h6"
                  fontWeight={600}
                  textAlign="center"
                  mb={1}
                  color={item.comingSoon ? 'text.secondary' : 'text.primary'}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={2}
                  flexGrow={1}
                  textAlign="center"
                >
                  {item.description}
                </Typography>

                <Button
                  variant={item.comingSoon ? 'outlined' : 'contained'}
                  disabled={!!item.comingSoon}
                  sx={{ mt: 'auto', borderRadius: 2, backgroundColor: item.comingSoon ? 'transparent' : '#caa84c', color: item.comingSoon ? 'text.secondary' : '#fff', '&:hover': { backgroundColor: item.comingSoon ? 'transparent' : '#b5944a' } }}
                  fullWidth
                >
                  {item.comingSoon ? 'Coming Soon' : 'Play Now'}
                </Button>
              </Paper>
            </Box>
          ))}
        </AnimatePresence>
      </Box>

      {/* View All Competitions Button */}
      <Box textAlign="center" mt={4}>
        <Button variant="outlined" sx={{ borderRadius: 2, px: 4, py: 1.5, borderColor: '#caa84c', color: '#caa84c' }}>
          View All Competitions
        </Button>
      </Box>
    </Box>
  );

};
