import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Stack,
  Divider,
  Card,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import GroupIcon from "@mui/icons-material/Group";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PersonIcon from "@mui/icons-material/Person";

interface TournamentLobbyProps {
  playersRequired: number;
  prize: string;
  onStartGame: () => void;
}

export const TournamentLobby: React.FC<TournamentLobbyProps> = ({
  playersRequired,
  prize,
  onStartGame,
}) => {
  const [players, setPlayers] = useState<string[]>(["You"]);
  const [joined, setJoined] = useState(false);

  const handleJoinTournament = () => {
    if (!joined) {
      setJoined(true);

      // Mock other players joining
      setTimeout(() => {
        setPlayers((prev) => [...prev, "Player_02"]);
      }, 1200);

      setTimeout(() => {
        setPlayers((prev) => [...prev, "Player_03"]);
      }, 2200);
    }
  };

  const canStartGame = players.length >= playersRequired;

  return (
    <Card
      sx={{
        p: 4,
        borderRadius: 6,
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        maxWidth: 520,
        mx: "auto",
      }}
    >
      {/* HEADER */}
      <Box textAlign="center" mb={3}>
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{
            background: "linear-gradient(45deg,#355cde,#caa84c)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Tournament Lobby
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.75 }}>
          Prize Pool: {prize}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* PLAYER COUNT */}
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <GroupIcon sx={{ color: "#caa84c" }} />
        <Typography fontWeight={700}>
          Players Joined: {players.length}/{playersRequired}
        </Typography>

        {canStartGame && (
          <Chip
            label="Ready"
            color="success"
            size="small"
            sx={{ ml: "auto", fontWeight: 700 }}
          />
        )}
      </Stack>

      {/* PLAYER LIST */}
      <Stack spacing={1.5} mb={4}>
        {players.map((player, index) => (
          <motion.div
            key={player}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={1.5}
              sx={{
                p: 1.5,
                borderRadius: 3,
                background: "#f7f9fc",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: index === 0 ? "#caa84c" : "#355cde",
                  width: 36,
                  height: 36,
                }}
              >
                <PersonIcon />
              </Avatar>

              <Typography fontWeight={600}>
                {player}
                {player === "You" && (
                  <Typography
                    component="span"
                    fontSize={12}
                    sx={{ ml: 0.8, opacity: 0.6 }}
                  >
                    (You)
                  </Typography>
                )}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Stack>

      {/* ACTIONS */}
      {!joined ? (
        <Button
          fullWidth
          size="large"
          onClick={handleJoinTournament}
          sx={{
            borderRadius: 3,
            py: 1.4,
            fontWeight: 800,
            background: "#e6b800",
            color: "#1b1b1b",
            "&:hover": {
              background: "linear-gradient(45deg,#dfc178,#b69548)",
              boxShadow: "0 8px 24px rgba(202,168,76,0.5)",
            },
          }}
        >
          Join Tournament
        </Button>
      ) : (
        <Button
          fullWidth
          size="large"
          disabled={!canStartGame}
          startIcon={<PlayArrowIcon />}
          onClick={onStartGame}
          sx={{
            borderRadius: 3,
            py: 1.4,
            fontWeight: 800,
            background: canStartGame
              ? "linear-gradient(45deg,#355cde,#1d4ed8)"
              : "#ccc",
            color: "#fff",
          }}
        >
          Start Game
        </Button>
      )}
    </Card>
  );
};
