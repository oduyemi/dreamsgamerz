import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const CompetitionTooltip = () => (
  <Box
    sx={{
      p: 1.5,
      borderRadius: 2,
      background: "rgba(20, 20, 20, 0.75)",
      backdropFilter: "blur(14px)",
      border: "1px solid rgba(202,168,76,0.35)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
      maxWidth: 230,
    }}
  >
    <TooltipRow icon={<GroupIcon />} text="Players full → Match starts" />
    <TooltipRow icon={<AnimatedTimer />} text="30 mins prep" />
    <TooltipRow icon={<CheckCircleIcon />} text="Accept challenge" />
    <TooltipRow icon={<AnimatedTimer />} text="1 min countdown" />
    <TooltipRow icon={<CancelIcon />} text="Miss → Lose" />
  </Box>
);


const TooltipRow = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <Box display="flex" alignItems="center" gap={1} mb={0.6}>
    <Box sx={{ color: "#caa84c" }}>{icon}</Box>
    <Typography
      variant="caption"
      sx={{ color: "#fff", fontWeight: 600, letterSpacing: 0.3 }}
    >
      {text}
    </Typography>
  </Box>
);


const AnimatedTimer = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      repeat: Infinity,
      duration: 3,
      ease: "linear",
    }}
  >
    <AccessTimeIcon fontSize="small" />
  </motion.div>
);

