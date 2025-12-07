import React from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  LinearProgress,
  Card,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import TimelineIcon from "@mui/icons-material/Timeline";
import { motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
  players: number;
  prize: string;
}

export const CompetitionDetailsModal: React.FC<Props> = ({
  open,
  onClose,
  players,
  prize,
}) => {
  // Example target player count based on tier
  const targetPlayers = players;
  const currentPlayers = Math.floor(players * 0.37); // Example: 37% already joined

  const bracketStages = [
    "1,000,000 Players",
    "256 Players",
    "128 Players",
    "64 Players",
    "32 Players",
    "16 Players",
    "8 Players",
    "4 Players",
    "2 Players",
    "Champion",
  ];

  const prizeBreakdown = [
    { pos: "1st Place", amount: "$400,000" },
    { pos: "2nd Place", amount: "$250,000" },
    { pos: "3rd Place", amount: "$100,000" },
    { pos: "4th Place", amount: "$50,000" },
  ];

  const progress = (currentPlayers / targetPlayers) * 100;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        },
      }}
    >
      <DialogContent>
        {/* Header */}
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={800}
          sx={{
            background: "linear-gradient(45deg,#355cde,#caa84c)",
            backgroundClip: "text",
            color: "transparent",
            mb: 2,
          }}
        >
          Tournament Details
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* PLAYER JOIN PROGRESS */}
        <Box mb={4}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <GroupsIcon /> Players Joined
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            {currentPlayers.toLocaleString()} / {targetPlayers.toLocaleString()} Players
          </Typography>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              mt: 1,
              height: 10,
              borderRadius: 5,
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(45deg,#355cde,#caa84c)",
              },
            }}
          />
        </Box>

        {/* PRIZE BREAKDOWN */}
        <Box mb={4}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
          >
            <EmojiEventsIcon sx={{ color: "#caa84c" }} /> Prize Breakdown
          </Typography>

          <Grid container spacing={2}>
            {prizeBreakdown.map((p, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <Card
                  sx={{
                    p: 2,
                    textAlign: "center",
                    borderRadius: 3,
                    background: "white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <Typography fontWeight={700}>{p.pos}</Typography>
                  <Typography color="text.secondary">{p.amount}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* TOURNAMENT BRACKET OVERVIEW */}
        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
          >
            <TimelineIcon /> Tournament Structure
          </Typography>

          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 3,
              py: 1,
              pb: 2,
            }}
          >
            {bracketStages.map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Box
                  sx={{
                    p: 2,
                    minWidth: 120,
                    textAlign: "center",
                    borderRadius: 3,
                    background: "white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <Typography fontWeight={700}>{stage}</Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
