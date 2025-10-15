import React, { useState } from "react";
import {
  Box, Stack, Typography, Paper, Button, IconButton, Divider,
  Avatar, LinearProgress, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, useTheme, useMediaQuery, AppBar, Toolbar
} from "@mui/material";
import {
  Visibility, VisibilityOff, ArrowDownward, ArrowUpward,
  SwapHoriz, CreditCard, MonetizationOn, AccountBalance
} from "@mui/icons-material";

type TransactionType = "deposit" | "withdrawal" | "convert" | "win";

interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  date: string;
}

export const Wallet: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [convertOpen, setConvertOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [coinBalance, setCoinBalance] = useState<number>(5000);
  const [usdtBalance, setUsdtBalance] = useState<number>(50);
  const [convertAmount, setConvertAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<number>(0);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: "deposit", amount: 200, date: "Today, 10:30 AM" },
    { id: 2, type: "withdrawal", amount: 100, date: "Yesterday, 3:00 PM" },
    { id: 3, type: "win", amount: 25, date: "Oct 1, 8:00 PM" },
  ]);

  const totalBalance = (usdtBalance + coinBalance / 100).toFixed(2);
  const convertedUSDT = convertAmount ? (convertAmount / 100).toFixed(2) : 0;

  const handleDeposit = (amount: number) => {
    if (!amount || amount <= 0) return;
    setUsdtBalance((prev) => prev + amount);
    setTransactions((prev) => [
      { id: Date.now(), type: "deposit", amount, date: "Now" },
      ...prev,
    ]);
    setDepositOpen(false);
  };

  const handleWithdraw = (amount: number) => {
    if (!amount || amount <= 0 || amount > usdtBalance) return;
    setUsdtBalance((prev) => prev - amount);
    setTransactions((prev) => [
      { id: Date.now(), type: "withdrawal", amount, date: "Now" },
      ...prev,
    ]);
    setWithdrawOpen(false);
  };

  const handleConvert = () => {
    if (!convertAmount || convertAmount <= 0 || convertAmount > coinBalance)
      return;
    const usdt = convertAmount / 100;
    setCoinBalance((prev) => prev - convertAmount);
    setUsdtBalance((prev) => prev + usdt);
    setTransactions((prev) => [
      { id: Date.now(), type: "convert", amount: usdt, date: "Now" },
      ...prev,
    ]);
    setConvertAmount(0);
    setConvertOpen(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      {/* --- Consistent App Header (Like Homepage) --- */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "#111",
          borderBottom: "1px solid rgba(202,168,76,0.25)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              color: "#caa84c",
              fontWeight: 700,
              letterSpacing: 0.5,
              fontSize: "1.5rem",
            }}
          >
            Dream Gamers
          </Typography>
        </Toolbar>
      </AppBar>

      {/* --- Wallet Body --- */}
      <Box sx={{ p: 2, maxWidth: 480, mx: "auto", backgroundColor: "#fff" }}>
        {/* Header */}
        <Stack alignItems="center" mb={3} mt={2}>
          <MonetizationOn sx={{ fontSize: 40, color: "#caa84c", mb: 1 }} />
          <Typography variant="h5" fontWeight="bold" color="#caa84c">
            Wallet Overview
          </Typography>
        </Stack>

        {/* Balance Card */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 4,
            mb: 3,
            background: "linear-gradient(145deg, #fff7e6, #fff3cc)",
            boxShadow: "0 4px 16px rgba(202,168,76,0.2)",
          }}
        >
          <Stack alignItems="center" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Total Balance
            </Typography>

            {showBalance ? (
              <Typography
                variant={isSmall ? "h5" : "h4"}
                fontWeight="bold"
                color="#caa84c"
              >
                ${totalBalance}
              </Typography>
            ) : (
              <Typography variant="h4">•••••</Typography>
            )}

            <IconButton onClick={() => setShowBalance(!showBalance)} size="small">
              {showBalance ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography variant="body2" color="text.secondary">
                USDT Balance
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {showBalance ? `${usdtBalance.toFixed(2)} USDT` : "••••"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Coin Balance
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {showBalance ? `${coinBalance} Coins` : "••••"}
              </Typography>
            </Box>
          </Stack>

          <Box mt={3}>
            <Typography variant="caption" color="text.secondary">
              Progress toward next reward
            </Typography>
            <LinearProgress
              variant="determinate"
              value={65}
              sx={{
                height: 8,
                borderRadius: 4,
                mt: 0.5,
                "& .MuiLinearProgress-bar": { backgroundColor: "#caa84c" },
              }}
            />
          </Box>
        </Paper>

        {/* Quick Actions */}
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={1.5}
          mb={3}
        >
          <Button
            startIcon={<ArrowDownward />}
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#caa84c",
              "&:hover": { backgroundColor: "#b8962e" },
            }}
            onClick={() => setDepositOpen(true)}
          >
            Deposit
          </Button>
          <Button
            startIcon={<ArrowUpward />}
            fullWidth
            variant="outlined"
            color="error"
            onClick={() => setWithdrawOpen(true)}
          >
            Withdraw
          </Button>
          <Button
            startIcon={<SwapHoriz />}
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={() => setConvertOpen(true)}
          >
            Convert
          </Button>
        </Stack>

        {/* Transactions */}
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          mb={1}
          color="#caa84c"
        >
          Recent Transactions
        </Typography>

        {transactions.map((txn) => (
          <Paper
            key={txn.id}
            sx={{
              p: 2,
              mb: 1,
              display: "flex",
              alignItems: "center",
              borderRadius: 3,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              transition: "transform 0.2s ease",
              "&:hover": { transform: "translateY(-2px)" },
            }}
          >
            <Avatar
              sx={{
                bgcolor:
                  txn.type === "deposit"
                    ? "info.light"
                    : txn.type === "withdrawal"
                    ? "error.light"
                    : txn.type === "convert"
                    ? "secondary.light"
                    : "warning.light",
                color:
                  txn.type === "deposit"
                    ? "info.dark"
                    : txn.type === "withdrawal"
                    ? "error.dark"
                    : txn.type === "convert"
                    ? "secondary.dark"
                    : "warning.dark",
                mr: 2,
              }}
            >
              {txn.type === "deposit" ? (
                <ArrowDownward />
              ) : txn.type === "withdrawal" ? (
                <ArrowUpward />
              ) : (
                <SwapHoriz />
              )}
            </Avatar>

            <Box flexGrow={1}>
              <Typography fontWeight="medium" textTransform="capitalize">
                {txn.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {txn.date}
              </Typography>
            </Box>
            <Typography
              fontWeight="bold"
              color={
                txn.type === "withdrawal"
                  ? "error.main"
                  : txn.type === "deposit"
                  ? "info.main"
                  : "secondary.main"
              }
            >
              {txn.type === "withdrawal" ? "-" : "+"}${txn.amount}
            </Typography>
          </Paper>
        ))}

        <Button
          fullWidth
          variant="outlined"
          startIcon={<CreditCard />}
          sx={{
            mt: 2,
            borderColor: "#caa84c",
            color: "#caa84c",
            "&:hover": {
              backgroundColor: "rgba(202,168,76,0.08)",
              borderColor: "#b8962e",
            },
          }}
        >
          Add Payment Method
        </Button>

        {/* Convert Modal */}
        <Dialog open={convertOpen} onClose={() => setConvertOpen(false)}>
          <DialogTitle>Convert Coins to USDT</DialogTitle>
          <DialogContent>
            <Typography variant="body2" mb={1}>
              Conversion rate: <strong>100 Coins = 1 USDT</strong>
            </Typography>
            <TextField
              fullWidth
              type="number"
              label="Amount in Coins"
              value={convertAmount || ""}
              onChange={(e) => setConvertAmount(Number(e.target.value))}
              inputProps={{ min: 0, max: coinBalance }}
              sx={{ mb: 2 }}
            />
            {convertAmount > 0 && (
              <Typography variant="body2">
                You will receive: <strong>{convertedUSDT} USDT</strong>
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConvertOpen(false)}>Cancel</Button>
            <Button
              onClick={handleConvert}
              variant="contained"
              sx={{ backgroundColor: "#caa84c", "&:hover": { backgroundColor: "#b8962e" } }}
              disabled={!convertAmount || convertAmount <= 0}
            >
              Convert
            </Button>
          </DialogActions>
        </Dialog>

        {/* Deposit Modal */}
        <Dialog open={depositOpen} onClose={() => setDepositOpen(false)}>
          <DialogTitle>Deposit Funds</DialogTitle>
          <DialogContent>
            <Typography variant="body2" mb={2}>
              Enter amount to deposit (USDT)
            </Typography>

            <TextField
              fullWidth
              type="number"
              label="Amount (USDT)"
              value={depositAmount || ""}
              onChange={(e) => setDepositAmount(Number(e.target.value))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDepositOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                handleDeposit(depositAmount);
                setDepositAmount(0);
              }}
              variant="contained"
              sx={{ backgroundColor: "#caa84c", "&:hover": { backgroundColor: "#b8962e" } }}
            >
              Deposit
            </Button>
          </DialogActions>
        </Dialog>

        {/* Withdraw Modal */}
        <Dialog open={withdrawOpen} onClose={() => setWithdrawOpen(false)}>
          <DialogTitle>Withdraw USDT</DialogTitle>
          <DialogContent>
            <Typography variant="body2" mb={1}>
              Only your USDT balance can be withdrawn.
            </Typography>

            <TextField
              fullWidth
              type="number"
              label="Amount (USDT)"
              value={withdrawAmount || ""}
              onChange={(e) => setWithdrawAmount(Number(e.target.value))}
              inputProps={{ min: 0, max: usdtBalance }}
            />

            <Button
              fullWidth
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
              startIcon={<AccountBalance />}
            >
              Add Bank Details
            </Button>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setWithdrawOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleWithdraw(withdrawAmount)}
              disabled={withdrawAmount <= 0}
            >
              Withdraw
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};
