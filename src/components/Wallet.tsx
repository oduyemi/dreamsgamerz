import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel
} from '@ionic/react';
import {
  wallet,
  eye,
  eyeOff,
  arrowUpOutline,
  arrowDownOutline,
  swapHorizontalOutline,
  qrCodeOutline,
  cardOutline,
  cashOutline,
  trophyOutline
} from 'ionicons/icons';
import { useState } from 'react';
import { 
  Box, 
  Stack, 
  Typography, 
  IconButton, 
  Paper, 
  useTheme, 
  useMediaQuery,
  Divider,
  Badge,
  Avatar,
  LinearProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import './Wallet.css'; 

export const Wallet = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('transactions');
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // Mock data
  const transactions = [
    { id: 1, type: 'deposit', amount: 500, date: 'Today, 10:45 AM', status: 'completed', currency: 'USD' },
    { id: 2, type: 'withdrawal', amount: 150, date: 'Yesterday, 2:30 PM', status: 'completed', currency: 'USD' },
    { id: 3, type: 'win', amount: 75, date: 'Mar 12, 9:15 AM', status: 'completed', currency: 'USD' },
    { id: 4, type: 'deposit', amount: 200, date: 'Mar 10, 5:45 PM', status: 'pending', currency: 'USD' },
  ];

  const walletStats = {
    balance: 1250,
    weeklyChange: '+12.5%',
    currency: 'USD',
    goalProgress: 65
  };

  return (
    <IonPage className="wallet-page">
      {/* Header */}
      <IonHeader>
        <IonToolbar style={{ 
          backgroundColor: 'var(--color-panel)',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <IonTitle style={{ 
            // color: 'var(--color-accent)', 
            textAlign: 'center',
            fontWeight: 600,
            fontSize: isSmall ? '1.1rem' : '1.3rem'
          }}>
            <IonIcon icon={wallet} style={{ marginRight: 8 }} />
            Wallet
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ backgroundColor: 'var(--background-primary)' }}>
        <Box px={2} pt={3} maxWidth={480} mx="auto">
          {/* Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: 'var(--color-panel)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                background: 'linear-gradient(135deg, var(--card-gradient-start), var(--card-gradient-end))',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box 
                position="absolute" 
                top={0} 
                right={0} 
                p={1}
                onClick={() => setShowBalance(!showBalance)}
                sx={{ cursor: 'pointer' }}
              >
                <IonIcon 
                  icon={showBalance ? eyeOff : eye} 
                  style={{ color: 'var(--text-primary)', opacity: 0.7 }} 
                />
              </Box>

              <Stack spacing={2} alignItems="center">
                <Typography 
                  variant="body2" 
                  color="var(--text-secondary)" 
                  fontWeight="medium"
                >
                  Total Balance
                </Typography>
                
                {showBalance ? (
                  <>
                    <Typography 
                      fontSize={isSmall ? 32 : 40} 
                      fontWeight="bold"
                      sx={{
                        background: 'linear-gradient(90deg, var(--balance-gradient-start), var(--balance-gradient-end))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      ${walletStats.balance.toLocaleString()}
                    </Typography>
                    <Badge
                      color="success"
                      badgeContent={walletStats.weeklyChange}
                      sx={{
                        '& .MuiBadge-badge': {
                          right: -35,
                          bgcolor: 'var(--positive-bg)',
                          color: 'var(--positive-text)',
                          fontWeight: 'bold'
                        }
                      }}
                    >
                      <Typography variant="caption" color="var(--text-secondary)">
                        This week
                      </Typography>
                    </Badge>
                  </>
                ) : (
                  <Typography 
                    fontSize={isSmall ? 32 : 40} 
                    fontWeight="bold"
                    letterSpacing={4}
                  >
                    •••••••
                  </Typography>
                )}
              </Stack>

              {/* Progress towards goal */}
              <Box mt={3}>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="caption" color="var(--text-secondary)">
                    Savings Goal
                  </Typography>
                  <Typography variant="caption" fontWeight="bold" color="var(--color-accent)">
                    {walletStats.goalProgress}%
                  </Typography>
                </Stack>
                <LinearProgress 
                  variant="determinate" 
                  value={walletStats.goalProgress} 
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'var(--progress-bg)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'var(--color-accent)'
                    }
                  }} 
                />
              </Box>
            </Paper>
          </motion.div>

          {/* Quick Actions */}
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            spacing={2} 
            mt={3}
            px={1}
          >
            <IonButton 
              fill="clear" 
              color="medium"
              style={{
                '--background-hover': 'var(--hover-bg)',
                flexDirection: 'column',
                height: 'auto',
                padding: '12px 8px'
              }}
            >
              <IonIcon 
                icon={arrowDownOutline} 
                style={{ 
                  fontSize: 24,
                  color: 'var(--deposit-color)',
                  marginBottom: 4
                }} 
              />
              <IonLabel style={{ fontSize: 12 }}>Deposit</IonLabel>
            </IonButton>

            <IonButton 
              fill="clear" 
              color="medium"
              style={{
                '--background-hover': 'var(--hover-bg)',
                flexDirection: 'column',
                height: 'auto',
                padding: '12px 8px'
              }}
            >
              <IonIcon 
                icon={arrowUpOutline} 
                style={{ 
                  fontSize: 24,
                  color: 'var(--withdraw-color)',
                  marginBottom: 4
                }} 
              />
              <IonLabel style={{ fontSize: 12 }}>Withdraw</IonLabel>
            </IonButton>

            <IonButton 
              fill="clear" 
              color="medium"
              style={{
                '--background-hover': 'var(--hover-bg)',
                flexDirection: 'column',
                height: 'auto',
                padding: '12px 8px'
              }}
            >
              <IonIcon 
                icon={swapHorizontalOutline} 
                style={{ 
                  fontSize: 24,
                  color: 'var(--transfer-color)',
                  marginBottom: 4
                }} 
              />
              <IonLabel style={{ fontSize: 12 }}>Transfer</IonLabel>
            </IonButton>

            <IonButton 
              fill="clear" 
              color="medium"
              style={{
                '--background-hover': 'var(--hover-bg)',
                flexDirection: 'column',
                height: 'auto',
                padding: '12px 8px'
              }}
            >
              <IonIcon 
                icon={qrCodeOutline} 
                style={{ 
                  fontSize: 24,
                  color: 'var(--scan-color)',
                  marginBottom: 4
                }} 
              />
              <IonLabel style={{ fontSize: 12 }}>Scan</IonLabel>
            </IonButton>
          </Stack>

          {/* Tabs */}
          <IonSegment 
            value={activeTab} 
            onIonChange={e => setActiveTab(e.detail.value as string)}
            style={{
              marginTop: 24,
              '--background': 'var(--color-panel)',
              '--background-checked': 'var(--color-accent)',
              '--color': 'var(--text-secondary)',
              '--color-checked': '#fff'
            }}
          >
            <IonSegmentButton value="transactions">
              <IonLabel>Transactions</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="cards">
              <IonLabel>Cards</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="history">
              <IonLabel>History</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {/* Transactions List */}
          <Box mt={2}>
            {transactions.map((txn, index) => (
              <motion.div
                key={txn.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: 'var(--color-panel)',
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid var(--border-color)',
                    transition: '0.2s',
                    '&:hover': {
                      bgcolor: 'var(--hover-bg)'
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: txn.type === 'deposit' ? 'var(--deposit-bg)' : 
                               txn.type === 'withdrawal' ? 'var(--withdraw-bg)' : 
                               'var(--win-bg)',
                      color: txn.type === 'deposit' ? 'var(--deposit-color)' : 
                            txn.type === 'withdrawal' ? 'var(--withdraw-color)' : 
                            'var(--win-color)',
                      mr: 2,
                      width: 40,
                      height: 40
                    }}
                  >
                    <IonIcon 
                      icon={txn.type === 'deposit' ? arrowDownOutline : 
                           txn.type === 'withdrawal' ? arrowUpOutline : 
                           trophyOutline} 
                      style={{ fontSize: 18 }} 
                    />
                  </Avatar>
                  
                  <Box flexGrow={1}>
                    <Typography fontWeight="medium">
                      {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                    </Typography>
                    <Typography variant="body2" color="var(--text-secondary)">
                      {txn.date}
                    </Typography>
                  </Box>
                  
                  <Typography 
                    fontWeight="bold"
                    color={txn.type === 'withdrawal' ? 'var(--withdraw-color)' : 
                          txn.type === 'deposit' ? 'var(--deposit-color)' : 
                          'var(--win-color)'}
                  >
                    {txn.type === 'withdrawal' ? '-' : '+'}${txn.amount}
                  </Typography>
                </Paper>
              </motion.div>
            ))}
          </Box>

          {/* Add Funds CTA */}
          <Box mt={3} textAlign="center">
            <IonButton 
              expand="block" 
              color="primary"
              style={{
                '--border-radius': '12px',
                fontWeight: 500
              }}
            >
              <IonIcon icon={cardOutline} slot="start" />
              Add Payment Method
            </IonButton>
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};