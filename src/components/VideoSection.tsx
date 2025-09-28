import React from "react";
import { Box, Typography, Card, CardMedia, Chip, Stack } from "@mui/material";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  category?: string;
  rating?: number;
  rank?: number;
}

interface VideoSectionProps {
  title: string;
  videos: Video[];
}

export const VideoSection: React.FC<VideoSectionProps> = ({ title, videos }) => {
  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 3, background: "#fff" }}>
      {/* Section Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: "#1A1A1A",
          mb: 2,
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </Typography>

      {/* Horizontal Scroll Row */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          pb: 1,
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {videos.map((video) => (
          <Card
            key={video.id}
            sx={{
              flex: "0 0 auto",
              width: { xs: 160, sm: 200, md: 220 },
              borderRadius: 3,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
              cursor: "pointer",
              position: "relative",
              scrollSnapAlign: "start",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
              },
            }}
          >
            {/* Thumbnail */}
            <CardMedia
              component="img"
              height="120"
              image={video.thumbnail}
              alt={video.title}
              sx={{ borderRadius: 3 }}
            />

            {/* Overlay Info */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                bgcolor: "rgba(0,0,0,0.5)",
                color: "#fff",
                px: 1,
                py: 0.5,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
              }}
            >
              <Typography
                variant="body2"
                noWrap
                sx={{ fontWeight: 600 }}
              >
                {video.title}
              </Typography>
            </Box>

            {/* Rank Badge */}
            {video.rank && (
              <Chip
                label={`TOP ${video.rank.toString().padStart(2, "0")}`}
                size="small"
                color="secondary"
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  bgcolor: "linear-gradient(135deg, #ff4d4f, #ff8c42)",
                  color: "#fff",
                  fontWeight: 700,
                }}
              />
            )}

            {/* Rating Badge */}
            {video.rating && (
              <Chip
                label={video.rating}
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "rgba(0,0,0,0.7)",
                  color: "#fff",
                  fontWeight: 600,
                }}
              />
            )}

            {/* Category Tag */}
            {video.category && (
              <Chip
                label={video.category}
                size="small"
                sx={{
                  position: "absolute",
                  top: 36,
                  left: 8,
                  bgcolor: "#caa84c",
                  color: "#fff",
                  fontWeight: 600,
                }}
              />
            )}
          </Card>
        ))}
      </Box>
    </Box>
  );
};
