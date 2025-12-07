import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { trophyOutline, gameControllerOutline } from 'ionicons/icons';
import token from '/images/token.png';
import { IonIcon, IonRouterLink } from '@ionic/react';

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
    description: "Test your reflexes in this thrilling picture-matching challenge.",
    highlight: true, 
    link: "/games/moving-picture",
    prize: "500 Tokens"
  },
  { 
    id: 2, 
    comingSoon: true,
    title: "Memory Challenge",
    description: "Coming soon: Train your mind in a battle of memory.",
  },
  { 
    id: 3, 
    comingSoon: true,
    title: "Speed Typing",
    description: "Coming soon: Race the clock and dominate the leaderboard.",
  },
];

export const GamersCompetitionTab: React.FC = () => {
  // DEMO MODE LOGIC
  const [adsWatched, setAdsWatched] = useState(0);
  const requiredAds = 5;

  const handleWatchAd = () => {
    if (adsWatched < requiredAds) {
      setAdsWatched(prev => prev + 1);
    }
  };

  const demoUnlocked = adsWatched >= requiredAds;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      sx={{
        minHeight: '100vh',
        p: 3,
        bgcolor: "#ffffff",
      }}
    >
      {/* Header */}
      <Box textAlign="center" mb={5}>
        <Typography
          variant="h4"
          component={motion.h1}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          fontWeight={800}
          mb={1}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            background: 'linear-gradient(45deg, #caa84c, #b89c55)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          <IonIcon icon={gameControllerOutline} style={{ fontSize: 30 }} />
          Gamers Arena
        </Typography>

        <Typography
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          color="text.secondary"
          maxWidth={640}
          mx="auto"
          fontSize={15}
        >
          Compete. Win Rewards. Master your skills with Demo Mode.
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
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              display="flex"
            >
              <Paper
                elevation={4}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  p: 3,
                  height: '100%',
                  background: item.highlight ? "#fff9ec" : "#ffffff",
                  border: item.highlight
                    ? "1px solid #caa84c"
                    : "1px solid #eeeeee",
                  boxShadow: item.highlight
                    ? "0px 4px 20px rgba(202,168,76,0.25)"
                    : "0px 4px 10px rgba(0,0,0,0.05)",
                }}
              >
                {/* Image + Prize */}
                {item.image && (
                  <Box
                    component={IonRouterLink}
                    href={item.link ?? "#"}
                    mb={2}
                    textAlign="center"
                    sx={{ textDecoration: "none" }}
                  >
                    <Box
                      component={motion.img}
                      src={item.image}
                      alt={item.title}
                      sx={{
                        width: "100%",
                        height: 160,
                        borderRadius: 3,
                        objectFit: 'contain',
                      }}
                      whileHover={{ scale: 1.05 }}
                    />
                    {item.prize && (
                      <Box
                        sx={{
                          mt: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          px: 2,
                          py: 0.6,
                          background: 'linear-gradient(45deg,#caa84c,#e9d9a4)',
                          borderRadius: 3,
                          fontWeight: 700,
                          fontSize: 12,
                          color: '#2d2d2d',
                        }}
                      >
                        <IonIcon icon={trophyOutline} />
                        {item.prize}
                      </Box>
                    )}
                  </Box>
                )}

                {/* Title */}
                <Typography
                  variant="h6"
                  fontWeight={700}
                  textAlign="center"
                  mb={1}
                  sx={{
                    color: item.comingSoon ? '#888' : '#222',
                    letterSpacing: 0.3,
                  }}
                >
                  {item.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={2}
                  flexGrow={1}
                  textAlign="center"
                >
                  {item.description}
                </Typography>

                {/* Play Now Button */}
                <Box mb={1.5}>
                  {item.comingSoon ? (
                    <Button
                      variant="outlined"
                      disabled
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        color: '#aaa',
                        borderColor: '#ccc',
                        py: 1.2,
                      }}
                    >
                      Coming Soon
                    </Button>
                  ) : (
                    <Button
                      component={IonRouterLink}
                      href={item.link ?? "#"}
                      routerDirection="forward"
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        py: 1.2,
                        background: 'linear-gradient(45deg,#caa84c,#b5944a)',
                        color: '#1b1b1b',
                        fontWeight: 700,
                      }}
                    >
                      Play Now
                    </Button>
                  )}
                </Box>

                {/* Demo Mode Button */}
                {!item.comingSoon && (
                  demoUnlocked ? (
                    <Button
                      fullWidth
                      component={IonRouterLink}
                      href={`/games/demo/${item.id}`}
                      routerDirection="forward"
                      sx={{
                        borderRadius: 2,
                        py: 1.1,
                        background: "linear-gradient(45deg,#e0e0e0,#ffffff)",
                        color: "#333",
                        border: "1px solid #ddd",
                        fontSize: 13,
                        '&:hover': { background: "#fafafa" },
                      }}
                    >
                      Try Demo Mode
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      onClick={handleWatchAd}
                      sx={{
                        borderRadius: 2,
                        py: 1.1,
                        background: "#f4f4f4",
                        color: "#333",
                        border: "1px solid #ddd",
                        fontSize: 13,
                        '&:hover': { background: "#f0f0f0" },
                      }}
                    >
                      Watch Ads: {adsWatched}/{requiredAds}
                    </Button>
                  )
                )}

              </Paper>
            </Box>
          ))}
        </AnimatePresence>
      </Box>

      {/* Footer Button */}
      <Box textAlign="center" mt={5}>
        <Button
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 5,
            py: 1.5,
            borderColor: '#caa84c',
            color: '#caa84c',
            fontWeight: 700,
            '&:hover': {
              borderColor: '#b5944a',
              color: '#b5944a',
            },
          }}
        >
          View All Competitions
        </Button>
      </Box>
    </Box>
  );
};
