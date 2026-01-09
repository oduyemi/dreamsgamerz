import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Paper,
  Button,
  IconButton,
  Divider,
  Avatar,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ArrowDownward,
  ArrowUpward,
  SwapHoriz,
  Autorenew,
  CreditCard,
  MonetizationOn,
} from "@mui/icons-material";

/* ---------------- TYPES ---------------- */
type TransactionType =
  | "deposit"
  | "withdrawal"
  | "convert"
  | "win"
  | "transfer";

type ConvertDirection = "coin-to-usdt" | "usdt-to-coin";

interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  date: string;
}

/* ---------------- COMPONENT ---------------- */
export const Wallet: React.FC = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [showBalance, setShowBalance] = useState(true);

  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [convertOpen, setConvertOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);

  const [coinBalance, setCoinBalance] = useState(5000); // 100 coins = 1 USDT
  const [usdtBalance, setUsdtBalance] = useState(50);

  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [convertAmount, setConvertAmount] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [transferTo, setTransferTo] = useState("");

  const [convertDirection, setConvertDirection] =
    useState<ConvertDirection>("coin-to-usdt");

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: "deposit", amount: 200, date: "Today · 10:30 AM" },
    { id: 2, type: "withdrawal", amount: 100, date: "Yesterday · 3:00 PM" },
    { id: 3, type: "win", amount: 25, date: "Oct 1 · 8:00 PM" },
  ]);

  const totalBalance = (usdtBalance + coinBalance / 100).toFixed(2);

  const convertedValue =
    convertDirection === "coin-to-usdt"
      ? (convertAmount / 100).toFixed(2)
      : (convertAmount * 100).toFixed(0);

  const logTxn = (type: TransactionType, amount: number) => {
    setTransactions((prev) => [
      { id: Date.now(), type, amount, date: "Just now" },
      ...prev,
    ]);
  };

  /* ---------------- HANDLERS ---------------- */
  const handleDeposit = () => {
    if (depositAmount <= 0) return;
    setUsdtBalance((p) => p + depositAmount);
    logTxn("deposit", depositAmount);
    setDepositAmount(0);
    setDepositOpen(false);
  };

  const handleWithdraw = () => {
    if (withdrawAmount <= 0 || withdrawAmount > usdtBalance) return;
    setUsdtBalance((p) => p - withdrawAmount);
    logTxn("withdrawal", withdrawAmount);
    setWithdrawAmount(0);
    setWithdrawOpen(false);
  };

  const handleConvert = () => {
    if (convertAmount <= 0) return;

    if (convertDirection === "coin-to-usdt") {
      if (convertAmount > coinBalance) return;
      const usdt = convertAmount / 100;
      setCoinBalance((p) => p - convertAmount);
      setUsdtBalance((p) => p + usdt);
      logTxn("convert", usdt);
    } else {
      if (convertAmount > usdtBalance) return;
      const coins = convertAmount * 100;
      setUsdtBalance((p) => p - convertAmount);
      setCoinBalance((p) => p + coins);
      logTxn("convert", convertAmount);
    }

    setConvertAmount(0);
    setConvertOpen(false);
  };

  const handleTransfer = () => {
    if (!transferTo || transferAmount <= 0 || transferAmount > usdtBalance)
      return;
    setUsdtBalance((p) => p - transferAmount);
    logTxn("transfer", transferAmount);
    setTransferAmount(0);
    setTransferTo("");
    setTransferOpen(false);
  };

  /* ---------------- UI ---------------- */
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        background: "#ffffff",
        pb: "env(safe-area-inset-bottom)",
      }}
    >
      {/* APP BAR */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "white",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(202,168,76,0.15)",
        }}
      >
        <Toolbar>
          <Typography
            sx={{
              flexGrow: 1,
              textAlign: "center",
              color: "#caa84c",
              fontWeight: 800,
              letterSpacing: 0.8,
            }}
          >
            Dream Gamers
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2, maxWidth: 480, mx: "auto" }}>
        {/* HEADER */}
        <Stack alignItems="center" mb={3} mt={1}>
          <MonetizationOn sx={{ fontSize: 42, color: "#caa84c" }} />
          <Typography variant="h5" fontWeight={800} color="#caa84c">
            Wallet
          </Typography>
        </Stack>

        {/* BALANCE CARD */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 4,
            mb: 3,
            background:
              "linear-gradient(145deg, rgba(202,168,76,0.05), rgba(202,168,76,0.02))",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(202,168,76,0.25)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
          }}
        >
          <Stack alignItems="center" spacing={1}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Total Balance
            </Typography>

            <Typography
              variant={isSmall ? "h5" : "h4"}
              fontWeight={900}
              sx={{ color: "#caa84c", letterSpacing: 0.6 }}
            >
              {showBalance ? `$${totalBalance}` : "•••••"}
            </Typography>

            <IconButton onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? (
                <VisibilityOff sx={{ color: "#caa84c" }} />
              ) : (
                <Visibility sx={{ color: "#caa84c" }} />
              )}
            </IconButton>
          </Stack>

          <Divider sx={{ my: 2, borderColor: "rgba(202,168,76,0.2)" }} />

          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight={700}>
              {showBalance ? `${usdtBalance.toFixed(2)} USDT` : "••••"}
            </Typography>
            <Typography fontWeight={700}>
              {showBalance ? `${coinBalance} Coins` : "••••"}
            </Typography>
          </Stack>

          <Box mt={2}>
            <LinearProgress
              variant="determinate"
              value={65}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "rgba(202,168,76,0.1)",
                "& .MuiLinearProgress-bar": {
                  background:
                    "linear-gradient(90deg, #caa84c, #f7dc8a)",
                },
              }}
            />
          </Box>
        </Paper>

        {/* QUICK ACTIONS */}
        <Stack spacing={1.2} mb={3}>
          <Stack direction="row" spacing={1.2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<ArrowDownward />}
              onClick={() => setDepositOpen(true)}
              sx={{
                minHeight: 52,
                borderRadius: 3,
                fontWeight: 700,
                textTransform: "none",
                background:
                  "linear-gradient(135deg, #caa84c, #f7dc8a)",
                boxShadow: "0 6px 20px rgba(202,168,76,0.5)",
              }}
            >
              Deposit
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<ArrowUpward />}
              onClick={() => setWithdrawOpen(true)}
              sx={{
                minHeight: 52,
                borderRadius: 3,
                fontWeight: 700,
                textTransform: "none",
                borderColor: "rgba(202,168,76,0.6)",
                color: "#caa84c",
              }}
            >
              Withdraw
            </Button>
          </Stack>

          <Stack direction="row" spacing={1.2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Autorenew />}
              onClick={() => setConvertOpen(true)}
              sx={{
                minHeight: 52,
                borderRadius: 3,
                fontWeight: 700,
                textTransform: "none",
                borderColor: "rgba(202,168,76,0.6)",
                color: "#caa84c",
              }}
            >
              Convert
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<SwapHoriz />}
              onClick={() => setTransferOpen(true)}
              sx={{
                minHeight: 52,
                borderRadius: 3,
                fontWeight: 700,
                textTransform: "none",
                borderColor: "rgba(202,168,76,0.6)",
                color: "#caa84c",
              }}
            >
              Transfer
            </Button>
          </Stack>
        </Stack>

        {/* TRANSACTIONS */}
        <Typography fontWeight={800} sx={{ color: "#caa84c" }} mb={1}>
          Recent Activity
        </Typography>

        {transactions.map((txn) => (
          <Paper
            key={txn.id}
            sx={{
              p: 2,
              mb: 1,
              borderRadius: 3,
              background: "rgba(202,168,76,0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(202,168,76,0.15)",
            }}
          >
            <Stack direction="row" alignItems="center">
              <Avatar
                sx={{
                  mr: 2,
                  background:
                    "linear-gradient(135deg, #caa84c, #f7dc8a)",
                  color: "#111",
                }}
              >
                <Autorenew />
              </Avatar>

              <Box flexGrow={1}>
                <Typography fontWeight={700}>{txn.type}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.6 }}>
                  {txn.date}
                </Typography>
              </Box>

              <Typography fontWeight={800}>
                {txn.type === "withdrawal" ? "-" : "+"}${txn.amount}
              </Typography>
            </Stack>
          </Paper>
        ))}

        <Button
          fullWidth
          variant="outlined"
          startIcon={<CreditCard />}
          sx={{
            mt: 2,
            borderColor: "rgba(202,168,76,0.6)",
            color: "#caa84c",
          }}
        >
          Add Payment Method
        </Button>
      </Box>

      {/* ---------------- DIALOGS ---------------- */}

      {/* Deposit & Withdraw */}
      {[
        {
          open: depositOpen,
          title: "Deposit USDT",
          amount: depositAmount,
          setAmount: setDepositAmount,
          action: handleDeposit,
          actionText: "Deposit",
          close: () => setDepositOpen(false),
        },
        {
          open: withdrawOpen,
          title: "Withdraw USDT",
          amount: withdrawAmount,
          setAmount: setWithdrawAmount,
          action: handleWithdraw,
          actionText: "Withdraw",
          close: () => setWithdrawOpen(false),
        },
      ].map((d, i) => (
        <Dialog
          key={i}
          open={d.open}
          onClose={d.close}
          fullWidth
          fullScreen={isSmall}
          PaperProps={{
            sx: {
              borderRadius: 4,
              background: "rgba(18,24,35,0.7)",
              backdropFilter: "blur(18px)",
              color: "#fff",
            },
          }}
        >
          <DialogTitle>{d.title}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              value={d.amount || ""}
              onChange={(e) => d.setAmount(+e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={d.close}>Cancel</Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#caa84c", fontWeight: 700 }}
              onClick={d.action}
            >
              {d.actionText}
            </Button>
          </DialogActions>
        </Dialog>
      ))}

      {/* CONVERT */}
      <Dialog
        open={convertOpen}
        onClose={() => setConvertOpen(false)}
        fullWidth
        fullScreen={isSmall}
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: "rgba(18,24,35,0.7)",
            backdropFilter: "blur(18px)",
            color: "#fff",
          },
        }}
      >
        <DialogTitle fontWeight={800}>Convert Assets</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={1} mb={2}>
            <Button
              fullWidth
              variant={convertDirection === "coin-to-usdt" ? "contained" : "outlined"}
              onClick={() => setConvertDirection("coin-to-usdt")}
              sx={{
                fontWeight: 700,
                backgroundColor:
                  convertDirection === "coin-to-usdt" ? "#caa84c" : "transparent",
                color:
                  convertDirection === "coin-to-usdt" ? "#111" : "#f7dc8a",
                borderColor: "rgba(202,168,76,0.6)",
              }}
            >
              Coin → USDT
            </Button>

            <Button
              fullWidth
              variant={convertDirection === "usdt-to-coin" ? "contained" : "outlined"}
              onClick={() => setConvertDirection("usdt-to-coin")}
              sx={{
                fontWeight: 700,
                backgroundColor:
                  convertDirection === "usdt-to-coin" ? "#caa84c" : "transparent",
                color:
                  convertDirection === "usdt-to-coin" ? "#111" : "#f7dc8a",
                borderColor: "rgba(202,168,76,0.6)",
              }}
            >
              USDT → Coin
            </Button>
          </Stack>

          <TextField
            fullWidth
            type="number"
            label={convertDirection === "coin-to-usdt" ? "Coins" : "USDT"}
            value={convertAmount || ""}
            onChange={(e) => setConvertAmount(+e.target.value)}
            helperText={
              convertDirection === "coin-to-usdt"
                ? `You’ll receive ${convertedValue} USDT (100 coins = 1 USDT)`
                : `You’ll receive ${convertedValue} Coins (1 USDT = 100 coins)`
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConvertOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#caa84c", fontWeight: 700 }}
            onClick={handleConvert}
          >
            Convert
          </Button>
        </DialogActions>
      </Dialog>

      {/* TRANSFER */}
      <Dialog
        open={transferOpen}
        onClose={() => setTransferOpen(false)}
        fullWidth
        fullScreen={isSmall}
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: "rgba(18,24,35,0.7)",
            backdropFilter: "blur(18px)",
            color: "#fff",
          },
        }}
      >
        <DialogTitle>Transfer USDT</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Recipient"
            value={transferTo}
            onChange={(e) => setTransferTo(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Amount"
            value={transferAmount || ""}
            onChange={(e) => setTransferAmount(+e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTransferOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#caa84c", fontWeight: 700 }}
            onClick={handleTransfer}
          >
            Transfer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
