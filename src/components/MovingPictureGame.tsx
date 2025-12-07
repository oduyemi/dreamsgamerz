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
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CompetitionDetailsModal } from "./CompetitionDetailsModal";

export const MovingPictureGameTab: React.FC = () => {
  const [lives, setLives] = useState(5);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedComp, setSelectedComp] = useState<any>(null);

  const [competitions, setCompetitions] = useState([
    { players: 50, prize: "50 USDT", comingSoon: false },
    { players: 100, prize: "100 USDT", comingSoon: false },
    { players: 500, prize: "500 USDT", comingSoon: false },
    { players: 1000, prize: "1000 USDT", comingSoon: false },
    { players: 100000, prize: "100000 USDT", comingSoon: false },
    { players: 500000, prize: "500000 USDT", comingSoon: true },
    { players: 1000000, prize: "1000000 USDT", comingSoon: true },
  ]);

  // Updated lifePackages with coins property
  const lifePackages = [
    { cost: 1, lives: 3, coins: 100 },
    { cost: 2, lives: 7, coins: 200 },
    { cost: 3, lives: 11, coins: 300 },
  ];

  const handleBuyLives = (extraLives: number) => {
    setLives((prev) => prev + extraLives);
  };

  return (
    <Box sx={{ width: "100%", py: 8, background: "linear-gradient(145deg,#eef2f3,#dfe9f3)" }}>
      <Container maxWidth="md">

        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(45deg,#355cde,#caa84c)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Moving Picture Game
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.75 }}>
            Stunning visuals. Premium rewards. A sleek competition experience.
          </Typography>
        </Box>

        {/* Glass Card */}
        <Card sx={{ p: 4, borderRadius: 6, background: "rgba(255,255,255,0.6)", backdropFilter: "blur(16px)" }}>

          {/* Lives */}
          <Box mb={5} textAlign="center">
            <Typography variant="h5" fontWeight={700}>
              <FavoriteIcon sx={{ color: "#e63946" }} /> Lives: {lives}
            </Typography>

            <Grid container spacing={3} justifyContent="center" mt={2}>
              {lifePackages.map((pkg, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Card
                      onClick={() => handleBuyLives(pkg.lives)}
                      sx={{
                        cursor: "pointer",
                        py: 3,
                        borderRadius: 4,
                        background: "white",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h6" fontWeight={700}>
                        {pkg.cost} USDT
                      </Typography>
                      <Typography color="text.secondary" sx={{ mb: 1 }}>
                        +{pkg.lives} Lives
                      </Typography>
                      <Typography color="text.secondary" fontWeight={600}>
                        +{pkg.coins.toLocaleString()} Coins
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Competitions */}
          <Typography
            variant="h5"
            fontWeight={800}
            textAlign="center"
            sx={{
              background: "linear-gradient(45deg,#355cde,#caa84c)",
              backgroundClip: "text",
              color: "transparent",
              mb: 3,
            }}
          >
            Competitions
          </Typography>

          {/* List */}
          <Box sx={{ maxHeight: "450px", overflowY: "auto", pr: 1 }}>
            <Grid container spacing={3}>
              {competitions.map((comp, index) => (
                <Grid item xs={12} key={index}>
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                    <Card sx={{ p: 2, borderRadius: 5 }}>
                      <CardContent>
                        <Box display="flex" justifyContent="space-between">
                          <Box>
                            <StarIcon sx={{ fontSize: 42, color: comp.comingSoon ? "grey" : "#caa84c" }} />
                            <Typography fontWeight={700}>
                              {comp.players.toLocaleString()} Players
                            </Typography>
                          </Box>

                          <Box textAlign="right">
                            <Typography fontWeight={700}>{comp.prize}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Prize Pool
                            </Typography>
                          </Box>
                        </Box>

                        {/* Two Buttons Side-by-Side */}
                        <Box display="flex" gap={2} mt={3}>
                          {/* DETAILS BUTTON (OUTLINE) */}
                          <Button
                            variant="outlined"
                            fullWidth
                            sx={{
                              borderRadius: 2,
                              py: 1.3,
                              borderColor: "#caa84c",
                              color: "#caa84c",
                              fontWeight: 700,
                              "&:hover": {
                                background: "linear-gradient(45deg,#dfc178,#b69548)",
                              },
                            }}
                            disabled={comp.comingSoon}
                            onClick={() => {
                              setSelectedComp(comp);
                              setDetailsOpen(true);
                            }}
                          >
                            {comp.comingSoon ? "Unavailable" : "Details"}
                          </Button>

                          {/* JOIN NOW BUTTON (FILLED) */}
                          <Button
                            variant="contained"
                            fullWidth
                            sx={{
                              borderRadius: 2,
                              py: 1.2,
                              background: "linear-gradient(45deg,#caa84c,#b5944a)",
                              color: "#1b1b1b",
                              fontWeight: 700,
                              "&:hover": {
                                background: "linear-gradient(45deg,#dfc178,#b69548)",
                              },
                            }}
                            disabled={comp.comingSoon}
                          >
                            {comp.comingSoon ? "Coming Soon" : "Join Now"}
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      </Container>

      {/* Modal Rendered HERE */}
      {selectedComp && (
        <CompetitionDetailsModal
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          players={selectedComp.players}
          prize={selectedComp.prize}
        />
      )}
    </Box>
  );
};

export default MovingPictureGameTab;
