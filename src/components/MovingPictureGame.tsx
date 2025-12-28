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
  Tooltip,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { CompetitionDetailsModal } from "./CompetitionDetailsModal";
import { CompetitionTooltip } from "./CompetitionTooltip";
import { TournamentLobby } from "./TournamentLobby";

export const MovingPictureGameTab: React.FC = () => {
  const [lives, setLives] = useState(5);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedComp, setSelectedComp] = useState<any>(null);
  const [showLobby, setShowLobby] = useState(false);

  /* ---------------- DATA ---------------- */

  const competitions = [
    { players: 2, prize: "50 USDT", comingSoon: false },
    { players: 2, prize: "100 USDT", comingSoon: false },
    { players: 2, prize: "500 USDT", comingSoon: false },
    { players: 2, prize: "1000 USDT", comingSoon: false },
    { players: 2, prize: "100000 USDT", comingSoon: false },
    { players: 2, prize: "500000 USDT", comingSoon: true },
  ];

  const lifePackages = [
    { cost: 1, lives: 3, coins: 100 },
    { cost: 2, lives: 7, coins: 200 },
    { cost: 3, lives: 11, coins: 300 },
  ];

  const handleBuyLives = (extraLives: number) => {
    setLives((prev) => prev + extraLives);
  };

  /* ---------------- TOURNAMENT LOBBY ---------------- */

  if (showLobby && selectedComp) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg,#eef2f3,#dfe9f3)",
          p: 3,
        }}
      >
        <TournamentLobby
          playersRequired={selectedComp.players}
          prize={selectedComp.prize}
          onStartGame={() => {
            console.log("Game Started");
            setShowLobby(false);
          }}
        />
      </Box>
    );
  }

  /* ---------------- MAIN VIEW ---------------- */

  return (
    <Box
      sx={{
        width: "100%",
        py: 8,
        background: "linear-gradient(145deg,#eef2f3,#dfe9f3)",
      }}
    >
      <Container maxWidth="md">
        {/* HEADER */}
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
            Stunning visuals. Premium rewards. Elite competition.
          </Typography>
        </Box>

        {/* MAIN CARD */}
        <Card
          sx={{
            p: 4,
            borderRadius: 6,
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(18px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}
        >
          {/* LIVES */}
          <Box mb={5} textAlign="center">
            <Typography variant="h5" fontWeight={700}>
              <FavoriteIcon sx={{ color: "#e63946", mr: 1 }} />
              Lives: {lives}
            </Typography>

            <Grid container spacing={3} justifyContent="center" mt={2}>
              {lifePackages.map((pkg, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  <motion.div whileHover={{ scale: 1.06 }}>
                    <Card
                      onClick={() => handleBuyLives(pkg.lives)}
                      sx={{
                        cursor: "pointer",
                        py: 3,
                        borderRadius: 4,
                        textAlign: "center",
                        background: "linear-gradient(180deg,#ffffff,#f7f9fc)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Typography variant="h6" fontWeight={800}>
                        {pkg.cost} USDT
                      </Typography>
                      <Typography color="text.secondary">
                        +{pkg.lives} Lives
                      </Typography>
                      <Typography fontWeight={600} color="text.secondary">
                        +{pkg.coins.toLocaleString()} Coins
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ my: 4, borderColor: "rgba(202,168,76,0.4)" }} />

          {/* COMPETITIONS */}
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

          <Grid container spacing={3}>
            {competitions.map((comp, index) => (
              <Grid item xs={12} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card
                    sx={{
                      p: 2,
                      borderRadius: 5,
                      background: "linear-gradient(180deg,#ffffff,#f7f9fc)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    }}
                  >
                    <CardContent>
                      <Box display="flex" justifyContent="space-between">
                        <Box>
                          <StarIcon sx={{ fontSize: 42, color: "#caa84c" }} />
                          <Typography fontWeight={700}>
                            {comp.players} Players
                          </Typography>
                        </Box>

                        <Box textAlign="right">
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <Typography fontWeight={700}>
                              {comp.prize}
                            </Typography>

                            {!comp.comingSoon && (
                              <Tooltip
                                title={<CompetitionTooltip />}
                                arrow
                              >
                                <IconButton
                                  size="small"
                                  sx={{ color: "#caa84c" }}
                                >
                                  <InfoOutlinedIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Prize Pool
                          </Typography>
                        </Box>
                      </Box>

                      <Box display="flex" gap={2} mt={3}>
                        <Button
                          variant="outlined"
                          fullWidth
                          disabled={comp.comingSoon}
                          onClick={() => {
                            setSelectedComp(comp);
                            setDetailsOpen(true);
                          }}
                          sx={{
                            borderRadius: 2,
                            borderColor: "#caa84c",
                            color: "#caa84c",
                            fontWeight: 700,
                          }}
                        >
                          Details
                        </Button>

                        <Button
                          variant="contained"
                          fullWidth
                          disabled={comp.comingSoon}
                          onClick={() => {
                            setSelectedComp(comp);
                            setShowLobby(true);
                          }}
                          sx={{
                            borderRadius: 2,
                            fontWeight: 800,
                            background:
                              "linear-gradient(45deg,#caa84c,#b5944a)",
                          }}
                        >
                          Join Now
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Container>

      {/* DETAILS MODAL */}
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
