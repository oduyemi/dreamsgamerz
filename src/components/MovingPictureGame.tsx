import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import "animate.css";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";

const competitions = [
  { players: 50, prize: "50 USDT" },
  { players: 100, prize: "500 USDT" },
  { players: 500, prize: "5000 USDT" },
  { players: 1000, prize: "1000 USDT" },
  { players: 100000, prize: "100000 USDT" },
  { players: 500000, prize: "500000 USDT", comingSoon: true },
  { players: 1000000, prize: "1000000 USDT", comingSoon: true },
];

const lifePackages = [
  { cost: 1, lives: 3 },
  { cost: 2, lives: 7 },
  { cost: 3, lives: 11 },
];

export const MovingPictureGameTab: React.FC = () => {
  const [lives, setLives] = useState(5);

  const handleBuyLives = (extraLives: number) => {
    setLives((prev) => prev + extraLives);
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#f6f7fb",
        color: "#111",
        py: { xs: 6, md: 8 },
        minHeight: "100%", // allows AppLayout scroll to work
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box
          textAlign="center"
          mb={6}
          className="animate__animated animate__fadeInDown"
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              background: "linear-gradient(45deg, #3a7bd5, #caa84c)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Moving Picture Game
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.85 }}>
            Join thrilling competitions and win massive rewards!
          </Typography>
        </Box>

        {/* Lives Section */}
        <Box
          className="animate__animated animate__fadeInUp animate__delay-1s"
          mb={6}
        >
          <Card
            sx={{
              borderRadius: 4,
              p: 4,
              background: "#ffffff",
              boxShadow: "0px 8px 25px rgba(0,0,0,0.08)",
            }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight={700}
              mb={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <FavoriteIcon sx={{ color: "#e63946" }} />
              Lives Remaining: {lives}
            </Typography>
            <Typography
              textAlign="center"
              variant="body2"
              mb={3}
              color="text.secondary"
            >
              Default lives: 5 | Buy more to keep playing
            </Typography>

            <Grid container spacing={3} justifyContent="center">
              {lifePackages.map((pkg, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  <motion.div whileHover={{ scale: 1.08 }}>
                    <Card
                      onClick={() => handleBuyLives(pkg.lives)}
                      sx={{
                        cursor: "pointer",
                        borderRadius: 3,
                        textAlign: "center",
                        py: 3,
                        transition: "all 0.3s ease",
                        background:
                          "linear-gradient(145deg, #fafafa, #ffffff 90%)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        "&:hover": {
                          boxShadow: "0 8px 18px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <Typography variant="h6" fontWeight={700}>
                        {pkg.cost} USDT
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        +{pkg.lives} Lives
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Box>

        {/* Competitions */}
        <Box className="animate__animated animate__fadeInUp animate__delay-2s">
          <Typography
            variant="h5"
            fontWeight={700}
            mb={3}
            textAlign="center"
            sx={{
              background: "linear-gradient(45deg, #3a7bd5, #caa84c)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Available Competitions
          </Typography>

          <Grid container spacing={3}>
            {competitions.map((comp, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      background:
                        "linear-gradient(145deg, #ffffff, #f8f9fb 80%)",
                      boxShadow: "0px 6px 20px rgba(0,0,0,0.06)",
                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Box textAlign="center" mb={2}>
                        <StarIcon
                          sx={{
                            fontSize: 44,
                            color: comp.comingSoon ? "grey" : "#caa84c",
                          }}
                        />
                        <Typography variant="h6" fontWeight={700} mt={1}>
                          {comp.players.toLocaleString()} Players
                        </Typography>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box display="flex" alignItems="center">
                          <PeopleIcon sx={{ mr: 1, color: "#3a7bd5" }} />
                          <Typography variant="body2">
                            {comp.players} Players
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <EmojiEventsIcon sx={{ mr: 1, color: "#caa84c" }} />
                          <Typography fontWeight={700}>{comp.prize}</Typography>
                        </Box>
                      </Box>

                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 3,
                          borderRadius: 3,
                          fontWeight: 600,
                          textTransform: "none",
                          bgcolor: comp.comingSoon ? "grey.400" : "#3a7bd5",
                          "&:hover": {
                            bgcolor: comp.comingSoon ? "grey.500" : "#2f64b3",
                          },
                        }}
                        disabled={!!comp.comingSoon}
                      >
                        {comp.comingSoon ? "Coming Soon" : "Join Now"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Footer */}
        {/* <Box
          textAlign="center"
          mt={10}
          className="animate__animated animate__fadeInUp animate__delay-3s"
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 1.8,
                borderRadius: 4,
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "0 8px 20px rgba(58,123,213,0.3)",
                bgcolor: "#3a7bd5",
                "&:hover": {
                  bgcolor: "#2f64b3",
                  boxShadow: "0 10px 25px rgba(58,123,213,0.4)",
                },
              }}
            >
              Discover More Competitions
            </Button>
          </motion.div>
        </Box> */}
      </Container>
    </Box>
  );
};

export default MovingPictureGameTab;
