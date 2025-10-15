import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export const HomePage =() =>{
  console.log("✅ HomePage mounted");

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Typography variant="h4">Test visible</Typography>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="body1">Motion works!</Typography>
      </motion.div>
    </Box>
  );
}
