import { IonIcon } from '@ionic/react';
import { notifications, eye, eyeOff } from 'ionicons/icons';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useUser } from '../hooks/useUser';

import {
  Box,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Grid,
  Badge,
  keyframes,
  useTheme,
  useMediaQuery,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { motion, useAnimation } from 'framer-motion';
import { GiTwoCoins } from 'react-icons/gi';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { fetchSupportMessages, sendSupportMessage } from '../lib/supportChat.api';
import Pusher from "pusher-js";


const updates = [
  '🎮 New Game Available',
  '🔥 Tournament Live',
  '🛒 New Product in Store',
];

export const HomePage = () => {
  const { user } = useUser();
  const [showBalance, setShowBalance] = useState(true);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [updateIndex, setUpdateIndex] = useState(0);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const controls = useAnimation();
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userId = user?.userId;

  const [messages, setMessages] = useState<
    { from: 'user' | 'admin' | 'system'; text: string }[]
  >([{ from: 'system', text: '👋 Hi! How can we help you today?' }]);

  // =============================
  // Load messages when chat opens
  // =============================
  useEffect(() => {
    if (!chatOpen) return;

    const loadChats = async () => {
      try {
        const data = await fetchSupportMessages();
        const mapped = data.map((c: any) => ({
          from: c.sender === 'USER' ? 'user' : 'admin',
          text: c.message,
        }));

        setMessages([
          { from: 'system', text: '👋 Hi! How can we help you today?' },
          ...mapped,
        ]);
      } catch (err) {
        console.error('Failed to load support chats', err);
      }
    };

    loadChats();
  }, [chatOpen]);

// Real-time admin replies (Pusher)
  useEffect(() => {
    if (!chatOpen || !userId) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channelName = `support-user-${userId}`;
    const channel = pusher.subscribe(channelName);

    channel.bind("message", (data: { sender: "USER" | "ADMIN"; message: string }) => {
      setMessages(prev => [
        ...prev,
        {
          from: data.sender === "ADMIN" ? "admin" : "user",
          text: data.message,
        },
      ]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [chatOpen, userId]);


//  =============================
  // Auto-scroll chat
  // =============================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // =============================
  // Send message
  // =============================
  const handleSend = async () => {
    if (!message.trim()) return;

    const text = message;

    setMessages(prev => [...prev, { from: 'user', text }]);
    setMessage('');

    try {
      await sendSupportMessage(text);
    } catch (err) {
      console.error('Failed to send support message', err);
    }
  };



  // Sample values (could come from API later)
  const gameDollars = 100;
  const coinBalance = 2500;
  const coinsToUsdRate = 100;

  const totalUsd = useMemo(() => {
    return gameDollars + coinBalance / coinsToUsdRate;
  }, [gameDollars, coinBalance]);

  // Rotate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateIndex((prev) => (prev + 1) % updates.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Subtle glow pulse animation
  const pulseGlow = keyframes`
    0% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); opacity: 0.7; }
  `;

  // Fade + lift animation variants
  const fadeLiftVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.08,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      controls.start('visible');
    }, 300);
    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        transform: isSmall ? 'scale(0.95)' : 'scale(1)',
        transformOrigin: 'center',
      }}
    >
      {/* Top Header Row */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          width: '100%',
          maxWidth: 600,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        {/* Updates Box */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Box
            sx={{
              px: 2,
              py: 0.8,
              borderRadius: 2,
              border: '2px solid #f2c94c',
              backgroundColor: '#fffdf5',
              boxShadow: '0 2px 8px rgba(202,168,76,0.25)',
              minWidth: 180,
              maxWidth: 220,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 14px rgba(202,168,76,0.4)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            <Stack spacing={0.3}>
              <Typography
                fontSize={11}
                fontWeight={600}
                color="#caa84c"
                textTransform="uppercase"
              >
                Updates
              </Typography>

              <motion.div
                key={updateIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <Typography fontSize={13} fontWeight={500} noWrap>
                  {updates[updateIndex]}
                </Typography>
              </motion.div>
            </Stack>
          </Box>
        </motion.div>

        {/* Floating Chat Box */}
        <Box
        sx={{
          position: 'static',
          // bottom: 24,
          right: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1,
          borderRadius: 20,
          backgroundColor: '#ffffff',
          border: '1px solid #eaeaea',
          boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
          cursor: 'pointer',
        }}
        onClick={() => setChatOpen(true)}
      >
        <ChatBubbleOutlineIcon sx={{ fontSize: 18, color: '#5b7fff' }} />
        <Typography fontSize={13}>Chat</Typography>
      </Box>

        {/* Notification Bell */}
        <IconButton
          aria-label="Notifications"
          sx={{
            color: '#5b7fff',
            '&:hover': { backgroundColor: 'rgba(91,127,255,0.08)' },
          }}
          onClick={() => setHasNotifications(false)}
        >
          <Badge color="error" variant="dot" invisible={!hasNotifications}>
            <IonIcon icon={notifications} style={{ fontSize: 24 }} />
          </Badge>
        </IconButton>
      </Box>

      {/* Balance Section */}
      <motion.div
        custom={0}
        variants={fadeLiftVariant}
        initial="hidden"
        animate={controls}
        style={{ width: '100%', maxWidth: 600, marginTop: 96 }}
      >
        <Box
          sx={{
            background: 'linear-gradient(145deg, #ffffff, #fafafa)',
            borderRadius: 3,
            p: 3,
            mx: 2,
            mb: 1,
            boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
            border: '1px solid #f0f0f0',
          }}
        >
          <Grid container spacing={2} justifyContent="space-around">
            {['Game Dollars', 'Coin Balance', 'USDT Owned'].map((label, index) => (
              <Grid item xs={4} key={index}>
                <Stack spacing={0.5} alignItems="center">
                  <Typography fontSize={12} color="text.secondary">
                    {label}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    {showBalance ? (
                      index === 0 ? (
                        <Typography fontWeight="bold" color="#caa84c">
                          ${gameDollars.toFixed(2)}
                        </Typography>
                      ) : index === 1 ? (
                        <>
                          <GiTwoCoins style={{ fontSize: 18, color: '#caa84c' }} />
                          <Typography fontWeight="bold">
                            {coinBalance.toLocaleString()}
                          </Typography>
                        </>
                      ) : (
                        <Typography fontWeight="bold">150</Typography>
                      )
                    ) : (
                      <Typography>••••</Typography>
                    )}
                    {index === 0 && (
                      <IonIcon
                        icon={showBalance ? eye : eyeOff}
                        style={{ fontSize: 16, cursor: 'pointer' }}
                        onClick={() => setShowBalance(!showBalance)}
                      />
                    )}
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        custom={1}
        variants={fadeLiftVariant}
        initial="hidden"
        animate={controls}
        style={{ width: '100%', maxWidth: 600 }}
      >
        <Box
          sx={{
            background: '#fafafa',
            borderRadius: 3,
            p: 3,
            mx: 2,
            mb: 1,
            border: '1px solid #eee',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src="/images/avatar.png"
              sx={{
                width: 64,
                height: 64,
                border: '2px solid #caa84c',
              }}
            />
            <Stack flex={1}>
              <Typography fontWeight="bold" color="#caa84c">
                Dreamer
              </Typography>
              <Typography variant="body2">Level 1 Adventurer</Typography>
              <Box sx={{ mt: 1, height: 6, backgroundColor: '#eee' }}>
                <Box sx={{ width: '30%', height: '100%', backgroundColor: '#caa84c' }} />
              </Box>
              <Typography variant="caption">120/400 XP to next level</Typography>
            </Stack>
          </Stack>
        </Box>
      </motion.div>

      <Box
            sx={{
              position: 'absolute',
              width: { xs: '180px', sm: '220px' },
              height: { xs: '180px', sm: '220px' },
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(202,168,76,0.25) 0%, transparent 70%)',
              filter: 'blur(12px)',
              animation: `${pulseGlow} 4s ease-in-out infinite`,
            }}
          />
          <img
            src="/images/hometoken.png"
            alt="Dreams token"
            style={{
              width: isSmall ? '120px' : '150px',
              height: isSmall ? '120px' : '150px',
              animation: `${pulseGlow} 4s ease-in-out infinite`,
              filter: 'drop-shadow(0 0 8px rgba(202,168,76,0.5))',
            }}
          />

      {/* Token Breakdown */}
          {/* Breakdown Box */}
          {controls && (
          <motion.div
            custom={3}
            variants={fadeLiftVariant}
            initial="hidden"
            animate={controls}
            transition={{ type: 'spring', stiffness: 80, damping: 12 }}
          >
            <Box
              sx={{
                backgroundColor: '#fafafa',
                borderRadius: 3,
                mt: 2,
                p: 2,
                mx: 2,
                mb: 3.5,
                textAlign: 'center',
                border: '1px solid #eee',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              }}
            >
              <Typography variant="subtitle2" color="#caa84c" fontWeight={600}>
                Token Breakdown
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2" color="text.secondary">
                USDT Owned: <b>${gameDollars.toFixed(2)}</b>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Coin Balance: <b>{coinBalance.toLocaleString()} coins</b> ≈ $
                {(coinBalance / coinsToUsdRate).toFixed(2)} USD
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1" fontWeight="bold" color="#caa84c">
                Total: ${totalUsd.toFixed(2)} USD
              </Typography>
              <Typography variant="caption" color="text.secondary">
                (100 coins = 1 USD)
              </Typography>
            </Box>
            </motion.div>
          )}

<Dialog
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 3,
            height: '70vh',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 600,
          }}
        >
          Live Chat
          <IconButton onClick={() => setChatOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowY: 'auto',
            backgroundColor: '#fafafa',
          }}
        >
          {messages.map((msg, i) => (
            <Box
              key={i}
              sx={{
                alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.from === 'user' ? '#5b7fff' : '#ffffff',
                color: msg.from === 'user' ? '#fff' : '#000',
                px: 2,
                py: 1,
                borderRadius: 2,
                maxWidth: '80%',
              }}
            >
              <Typography fontSize={13}>{msg.text}</Typography>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </DialogContent>

        <Box sx={{ display: 'flex', gap: 1, p: 1.5 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Type a message…"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            variant="contained"
            sx={{ minWidth: 44, backgroundColor: '#f2c94c' }}
            onClick={handleSend}
          >
            <SendIcon fontSize="small" />
          </Button>
        </Box>
      </Dialog>
      </Box>
    );
  };


