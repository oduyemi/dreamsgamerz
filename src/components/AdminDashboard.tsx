import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { motion } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const AdminDashboard = () => {
  const [games, setGames] = useState([
    { id: 1, name: "Moving Picture Game", description: "Fast-paced image challenge" }
  ]);

  const [competitions, setCompetitions] = useState([
    { id: 1, gameId: 1, players: 100, prize: "100 USDT", comingSoon: false },
    { id: 2, gameId: 1, players: 1000, prize: "1,000 USDT", comingSoon: false },
  ]);

  // FORMS
  const [gameForm, setGameForm] = useState({ name: "", description: "" });
  const [compForm, setCompForm] = useState({
    gameId: 1,
    players: "",
    prize: "",
    comingSoon: false,
  });

  // DIALOG FOR EDIT
  const [editItem, setEditItem] = useState<any>(null);
  const [editType, setEditType] = useState<"game" | "comp" | null>(null);

  const handleAddGame = () => {
    if (!gameForm.name) return;
    setGames([...games, {
      id: Date.now(),
      ...gameForm
    }]);
    setGameForm({ name: "", description: "" });
  };

  const handleAddCompetition = () => {
    if (!compForm.players || !compForm.prize) return;

    setCompetitions([
      ...competitions,
      {
        id: Date.now(),
        ...compForm,
        players: Number(compForm.players),
      },
    ]);

    setCompForm({ gameId: 1, players: "", prize: "", comingSoon: false });
  };

  const handleUpdate = () => {
    if (!editItem) return;

    if (editType === "game") {
      setGames(games.map((g) => (g.id === editItem.id ? editItem : g)));
    } else if (editType === "comp") {
      setCompetitions(
        competitions.map((c) => (c.id === editItem.id ? editItem : c))
      );
    }

    setEditItem(null);
    setEditType(null);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(145deg,#eef2f3,#dfe9f3)",
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight={800}
          sx={{
            mb: 6,
            background: "linear-gradient(45deg,#355cde,#caa84c)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Admin Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* LEFT SIDE – ADD GAME */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>Add New Game</Typography>

              <TextField
                fullWidth
                label="Game Name"
                value={gameForm.name}
                onChange={(e) =>
                  setGameForm({ ...gameForm, name: e.target.value })
                }
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Description"
                multiline
                value={gameForm.description}
                onChange={(e) =>
                  setGameForm({ ...gameForm, description: e.target.value })
                }
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                fullWidth
                sx={{
                  py: 1.3,
                  borderRadius: 3,
                  background: "linear-gradient(45deg,#caa84c,#b5944a)",
                  color: "#1b1b1b",
                }}
                onClick={handleAddGame}
              >
                Add Game
              </Button>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight={700} mb={1}>
                Existing Games
              </Typography>

              {games.map((g) => (
                <Card key={g.id} sx={{ p: 2, mb: 2 }}>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography fontWeight={700}>{g.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {g.description}
                      </Typography>
                    </Box>

                    <IconButton
                      onClick={() => {
                        setEditItem(g);
                        setEditType("game");
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Card>
              ))}
            </Card>
          </Grid>

          {/* RIGHT SIDE – ADD COMPETITION */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Add New Competition
              </Typography>

              <TextField
                fullWidth
                label="Players Required"
                type="number"
                value={compForm.players}
                onChange={(e) =>
                  setCompForm({ ...compForm, players: e.target.value })
                }
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Prize (e.g. 100 USDT)"
                value={compForm.prize}
                onChange={(e) =>
                  setCompForm({ ...compForm, prize: e.target.value })
                }
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                fullWidth
                sx={{
                  py: 1.3,
                  borderRadius: 3,
                  background: "linear-gradient(45deg,#caa84c,#b5944a)",
                  color: "#1b1b1b",
                }}
                onClick={handleAddCompetition}
              >
                Add Competition
              </Button>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight={700} mb={1}>
                Existing Competitions
              </Typography>

              {competitions.map((c) => (
                <Card key={c.id} sx={{ p: 2, mb: 2 }}>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography fontWeight={700}>
                        {c.players.toLocaleString()} Players
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Prize: {c.prize}
                      </Typography>
                    </Box>

                    <IconButton
                      onClick={() => {
                        setEditItem(c);
                        setEditType("comp");
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Card>
              ))}
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* EDIT DIALOG */}
      <Dialog open={Boolean(editItem)} onClose={() => setEditItem(null)}>
        <DialogTitle>Edit {editType === "game" ? "Game" : "Competition"}</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {editType === "game" && (
            <>
              <TextField
                fullWidth
                label="Game Name"
                value={editItem?.name}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                value={editItem?.description}
                onChange={(e) =>
                  setEditItem({ ...editItem, description: e.target.value })
                }
              />
            </>
          )}

          {editType === "comp" && (
            <>
              <TextField
                fullWidth
                label="Players"
                type="number"
                value={editItem?.players}
                onChange={(e) =>
                  setEditItem({ ...editItem, players: Number(e.target.value) })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Prize"
                value={editItem?.prize}
                onChange={(e) =>
                  setEditItem({ ...editItem, prize: e.target.value })
                }
              />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={() => setEditItem(null)} sx={{color: "#caa84c", borderColor:"#caa84c"}}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate} sx={{ background: "linear-gradient(45deg,#caa84c,#b5944a)", color: "#1b1b1b"}}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
