"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { ReelsModal } from "./ReelsModal";

// Animation for shimmer/light sweep
const shimmer = keyframes`
  0% { background-position: -200% center; }
  50% { background-position: 200% center; }
  100% { background-position: -200% center; }
`;

export const VideoHeader: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openReels, setOpenReels] = useState(false);

  const menuItems: { label: string; path: string }[] = [
    { label: "Short Drama", path: "/videos/shorts" },
    { label: "Funny", path: "/videos/funny-videos" },
    { label: "Animation", path: "/videos/animations" },
    { label: "Inspiring", path: "/videos/inspiration" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          background: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            px: { xs: 2, sm: 4 },
          }}
        >
          {/* Left: Logo/Title */}
          <Link to="/videos" style={{ textDecoration: "none"}}>
            <Typography
                variant="h6"
                sx={{
                fontWeight: "bold",
                letterSpacing: "0.5px",
                color: "black",
                }}
            >
                🎬 VideoHub
            </Typography>
          </Link>

          {/* Middle: Menu */}
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: isMobile ? "center" : "flex-start",
              flexWrap: "wrap",
              gap: { xs: 0.5, sm: 1.5 },
              mx: { xs: 0, sm: 3 },
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                  color: "black",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    backgroundColor: "transparent",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Right: Reels Button */}
          <Button
            onClick={() => setOpenReels(true)}
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              px: 3,
              py: 1,
              borderRadius: "30px",
              color: "black",
              borderColor: "black",
              position: "relative",
              overflow: "hidden",
              backgroundImage:
                "linear-gradient(120deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.2) 20%, rgba(255,255,255,0.2) 40%)",
              backgroundSize: "200% auto",
              animation: `${shimmer} 4s linear infinite`,
              "&:hover": {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                background: "rgba(0,0,0,0.05)",
              },
            }}
          >
            Reels
          </Button>
        </Toolbar>
      </AppBar>

      {/* Reels Modal */}
      <ReelsModal open={openReels} onClose={() => setOpenReels(false)} />
    </>
  );
};
