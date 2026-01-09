"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Wallet = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
/* ---------------- COMPONENT ---------------- */
exports.Wallet = function () {
    var theme = material_1.useTheme();
    var isSmall = material_1.useMediaQuery(theme.breakpoints.down("sm"));
    var _a = react_1.useState(true), showBalance = _a[0], setShowBalance = _a[1];
    var _b = react_1.useState(false), depositOpen = _b[0], setDepositOpen = _b[1];
    var _c = react_1.useState(false), withdrawOpen = _c[0], setWithdrawOpen = _c[1];
    var _d = react_1.useState(false), convertOpen = _d[0], setConvertOpen = _d[1];
    var _e = react_1.useState(false), transferOpen = _e[0], setTransferOpen = _e[1];
    var _f = react_1.useState(5000), coinBalance = _f[0], setCoinBalance = _f[1]; // 100 coins = 1 USDT
    var _g = react_1.useState(50), usdtBalance = _g[0], setUsdtBalance = _g[1];
    var _h = react_1.useState(0), depositAmount = _h[0], setDepositAmount = _h[1];
    var _j = react_1.useState(0), withdrawAmount = _j[0], setWithdrawAmount = _j[1];
    var _k = react_1.useState(0), convertAmount = _k[0], setConvertAmount = _k[1];
    var _l = react_1.useState(0), transferAmount = _l[0], setTransferAmount = _l[1];
    var _m = react_1.useState(""), transferTo = _m[0], setTransferTo = _m[1];
    var _o = react_1.useState("coin-to-usdt"), convertDirection = _o[0], setConvertDirection = _o[1];
    var _p = react_1.useState([
        { id: 1, type: "deposit", amount: 200, date: "Today · 10:30 AM" },
        { id: 2, type: "withdrawal", amount: 100, date: "Yesterday · 3:00 PM" },
        { id: 3, type: "win", amount: 25, date: "Oct 1 · 8:00 PM" },
    ]), transactions = _p[0], setTransactions = _p[1];
    var totalBalance = (usdtBalance + coinBalance / 100).toFixed(2);
    var convertedValue = convertDirection === "coin-to-usdt"
        ? (convertAmount / 100).toFixed(2)
        : (convertAmount * 100).toFixed(0);
    var logTxn = function (type, amount) {
        setTransactions(function (prev) { return __spreadArrays([
            { id: Date.now(), type: type, amount: amount, date: "Just now" }
        ], prev); });
    };
    /* ---------------- HANDLERS ---------------- */
    var handleDeposit = function () {
        if (depositAmount <= 0)
            return;
        setUsdtBalance(function (p) { return p + depositAmount; });
        logTxn("deposit", depositAmount);
        setDepositAmount(0);
        setDepositOpen(false);
    };
    var handleWithdraw = function () {
        if (withdrawAmount <= 0 || withdrawAmount > usdtBalance)
            return;
        setUsdtBalance(function (p) { return p - withdrawAmount; });
        logTxn("withdrawal", withdrawAmount);
        setWithdrawAmount(0);
        setWithdrawOpen(false);
    };
    var handleConvert = function () {
        if (convertAmount <= 0)
            return;
        if (convertDirection === "coin-to-usdt") {
            if (convertAmount > coinBalance)
                return;
            var usdt_1 = convertAmount / 100;
            setCoinBalance(function (p) { return p - convertAmount; });
            setUsdtBalance(function (p) { return p + usdt_1; });
            logTxn("convert", usdt_1);
        }
        else {
            if (convertAmount > usdtBalance)
                return;
            var coins_1 = convertAmount * 100;
            setUsdtBalance(function (p) { return p - convertAmount; });
            setCoinBalance(function (p) { return p + coins_1; });
            logTxn("convert", convertAmount);
        }
        setConvertAmount(0);
        setConvertOpen(false);
    };
    var handleTransfer = function () {
        if (!transferTo || transferAmount <= 0 || transferAmount > usdtBalance)
            return;
        setUsdtBalance(function (p) { return p - transferAmount; });
        logTxn("transfer", transferAmount);
        setTransferAmount(0);
        setTransferTo("");
        setTransferOpen(false);
    };
    /* ---------------- UI ---------------- */
    return (react_1["default"].createElement(material_1.Box, { sx: {
            minHeight: "100dvh",
            background: "#ffffff",
            pb: "env(safe-area-inset-bottom)"
        } },
        react_1["default"].createElement(material_1.AppBar, { position: "sticky", elevation: 0, sx: {
                background: "rgba(15,15,15,0.85)",
                backdropFilter: "blur(14px)",
                borderBottom: "1px solid rgba(202,168,76,0.15)"
            } },
            react_1["default"].createElement(material_1.Toolbar, null,
                react_1["default"].createElement(material_1.Typography, { sx: {
                        flexGrow: 1,
                        textAlign: "center",
                        color: "#caa84c",
                        fontWeight: 800,
                        letterSpacing: 0.8
                    } }, "Dream Gamers"))),
        react_1["default"].createElement(material_1.Box, { sx: { p: 2, maxWidth: 480, mx: "auto" } },
            react_1["default"].createElement(material_1.Stack, { alignItems: "center", mb: 3, mt: 1 },
                react_1["default"].createElement(icons_material_1.MonetizationOn, { sx: { fontSize: 42, color: "#caa84c" } }),
                react_1["default"].createElement(material_1.Typography, { variant: "h5", fontWeight: 800, color: "#caa84c" }, "Wallet")),
            react_1["default"].createElement(material_1.Paper, { sx: {
                    p: 3,
                    borderRadius: 4,
                    mb: 3,
                    background: "linear-gradient(145deg, rgba(202,168,76,0.05), rgba(202,168,76,0.02))",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(202,168,76,0.25)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.1)"
                } },
                react_1["default"].createElement(material_1.Stack, { alignItems: "center", spacing: 1 },
                    react_1["default"].createElement(material_1.Typography, { variant: "body2", sx: { opacity: 0.7 } }, "Total Balance"),
                    react_1["default"].createElement(material_1.Typography, { variant: isSmall ? "h5" : "h4", fontWeight: 900, sx: { color: "#caa84c", letterSpacing: 0.6 } }, showBalance ? "$" + totalBalance : "•••••"),
                    react_1["default"].createElement(material_1.IconButton, { onClick: function () { return setShowBalance(!showBalance); } }, showBalance ? (react_1["default"].createElement(icons_material_1.VisibilityOff, { sx: { color: "#caa84c" } })) : (react_1["default"].createElement(icons_material_1.Visibility, { sx: { color: "#caa84c" } })))),
                react_1["default"].createElement(material_1.Divider, { sx: { my: 2, borderColor: "rgba(202,168,76,0.2)" } }),
                react_1["default"].createElement(material_1.Stack, { direction: "row", justifyContent: "space-between" },
                    react_1["default"].createElement(material_1.Typography, { fontWeight: 700 }, showBalance ? usdtBalance.toFixed(2) + " USDT" : "••••"),
                    react_1["default"].createElement(material_1.Typography, { fontWeight: 700 }, showBalance ? coinBalance + " Coins" : "••••")),
                react_1["default"].createElement(material_1.Box, { mt: 2 },
                    react_1["default"].createElement(material_1.LinearProgress, { variant: "determinate", value: 65, sx: {
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: "rgba(202,168,76,0.1)",
                            "& .MuiLinearProgress-bar": {
                                background: "linear-gradient(90deg, #caa84c, #f7dc8a)"
                            }
                        } }))),
            react_1["default"].createElement(material_1.Stack, { spacing: 1.2, mb: 3 },
                react_1["default"].createElement(material_1.Stack, { direction: "row", spacing: 1.2 },
                    react_1["default"].createElement(material_1.Button, { fullWidth: true, variant: "contained", startIcon: react_1["default"].createElement(icons_material_1.ArrowDownward, null), onClick: function () { return setDepositOpen(true); }, sx: {
                            minHeight: 52,
                            borderRadius: 3,
                            fontWeight: 700,
                            textTransform: "none",
                            background: "linear-gradient(135deg, #caa84c, #f7dc8a)",
                            boxShadow: "0 6px 20px rgba(202,168,76,0.5)"
                        } }, "Deposit"),
                    react_1["default"].createElement(material_1.Button, { fullWidth: true, variant: "outlined", startIcon: react_1["default"].createElement(icons_material_1.ArrowUpward, null), onClick: function () { return setWithdrawOpen(true); }, sx: {
                            minHeight: 52,
                            borderRadius: 3,
                            fontWeight: 700,
                            textTransform: "none",
                            borderColor: "rgba(202,168,76,0.6)",
                            color: "#caa84c"
                        } }, "Withdraw")),
                react_1["default"].createElement(material_1.Stack, { direction: "row", spacing: 1.2 },
                    react_1["default"].createElement(material_1.Button, { fullWidth: true, variant: "outlined", startIcon: react_1["default"].createElement(icons_material_1.Autorenew, null), onClick: function () { return setConvertOpen(true); }, sx: {
                            minHeight: 52,
                            borderRadius: 3,
                            fontWeight: 700,
                            textTransform: "none",
                            borderColor: "rgba(202,168,76,0.6)",
                            color: "#caa84c"
                        } }, "Convert"),
                    react_1["default"].createElement(material_1.Button, { fullWidth: true, variant: "outlined", startIcon: react_1["default"].createElement(icons_material_1.SwapHoriz, null), onClick: function () { return setTransferOpen(true); }, sx: {
                            minHeight: 52,
                            borderRadius: 3,
                            fontWeight: 700,
                            textTransform: "none",
                            borderColor: "rgba(202,168,76,0.6)",
                            color: "#caa84c"
                        } }, "Transfer"))),
            react_1["default"].createElement(material_1.Typography, { fontWeight: 800, sx: { color: "#caa84c" }, mb: 1 }, "Recent Activity"),
            transactions.map(function (txn) { return (react_1["default"].createElement(material_1.Paper, { key: txn.id, sx: {
                    p: 2,
                    mb: 1,
                    borderRadius: 3,
                    background: "rgba(202,168,76,0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(202,168,76,0.15)"
                } },
                react_1["default"].createElement(material_1.Stack, { direction: "row", alignItems: "center" },
                    react_1["default"].createElement(material_1.Avatar, { sx: {
                            mr: 2,
                            background: "linear-gradient(135deg, #caa84c, #f7dc8a)",
                            color: "#111"
                        } },
                        react_1["default"].createElement(icons_material_1.Autorenew, null)),
                    react_1["default"].createElement(material_1.Box, { flexGrow: 1 },
                        react_1["default"].createElement(material_1.Typography, { fontWeight: 700 }, txn.type),
                        react_1["default"].createElement(material_1.Typography, { variant: "caption", sx: { opacity: 0.6 } }, txn.date)),
                    react_1["default"].createElement(material_1.Typography, { fontWeight: 800 },
                        txn.type === "withdrawal" ? "-" : "+",
                        "$",
                        txn.amount)))); }),
            react_1["default"].createElement(material_1.Button, { fullWidth: true, variant: "outlined", startIcon: react_1["default"].createElement(icons_material_1.CreditCard, null), sx: {
                    mt: 2,
                    borderColor: "rgba(202,168,76,0.6)",
                    color: "#caa84c"
                } }, "Add Payment Method")),
        [
            {
                open: depositOpen,
                title: "Deposit USDT",
                amount: depositAmount,
                setAmount: setDepositAmount,
                action: handleDeposit,
                actionText: "Deposit",
                close: function () { return setDepositOpen(false); }
            },
            {
                open: withdrawOpen,
                title: "Withdraw USDT",
                amount: withdrawAmount,
                setAmount: setWithdrawAmount,
                action: handleWithdraw,
                actionText: "Withdraw",
                close: function () { return setWithdrawOpen(false); }
            },
        ].map(function (d, i) { return (react_1["default"].createElement(material_1.Dialog, { key: i, open: d.open, onClose: d.close, fullWidth: true, fullScreen: isSmall, PaperProps: {
                sx: {
                    borderRadius: 4,
                    background: "rgba(18,24,35,0.7)",
                    backdropFilter: "blur(18px)",
                    color: "#fff"
                }
            } },
            react_1["default"].createElement(material_1.DialogTitle, null, d.title),
            react_1["default"].createElement(material_1.DialogContent, null,
                react_1["default"].createElement(material_1.TextField, { fullWidth: true, type: "number", label: "Amount", value: d.amount || "", onChange: function (e) { return d.setAmount(+e.target.value); } })),
            react_1["default"].createElement(material_1.DialogActions, null,
                react_1["default"].createElement(material_1.Button, { onClick: d.close }, "Cancel"),
                react_1["default"].createElement(material_1.Button, { variant: "contained", sx: { backgroundColor: "#caa84c", fontWeight: 700 }, onClick: d.action }, d.actionText)))); }),
        react_1["default"].createElement(material_1.Dialog, { open: convertOpen, onClose: function () { return setConvertOpen(false); }, fullWidth: true, fullScreen: isSmall, PaperProps: {
                sx: {
                    borderRadius: 4,
                    background: "rgba(18,24,35,0.7)",
                    backdropFilter: "blur(18px)",
                    color: "#fff"
                }
            } },
            react_1["default"].createElement(material_1.DialogTitle, { fontWeight: 800 }, "Convert Assets"),
            react_1["default"].createElement(material_1.DialogContent, null,
                react_1["default"].createElement(material_1.Stack, { direction: "row", spacing: 1, mb: 2 },
                    react_1["default"].createElement(material_1.Button, { fullWidth: true, variant: convertDirection === "coin-to-usdt" ? "contained" : "outlined", onClick: function () { return setConvertDirection("coin-to-usdt"); }, sx: {
                            fontWeight: 700,
                            backgroundColor: convertDirection === "coin-to-usdt" ? "#caa84c" : "transparent",
                            color: convertDirection === "coin-to-usdt" ? "#111" : "#f7dc8a",
                            borderColor: "rgba(202,168,76,0.6)"
                        } }, "Coin \u2192 USDT"),
                    react_1["default"].createElement(material_1.Button, { fullWidth: true, variant: convertDirection === "usdt-to-coin" ? "contained" : "outlined", onClick: function () { return setConvertDirection("usdt-to-coin"); }, sx: {
                            fontWeight: 700,
                            backgroundColor: convertDirection === "usdt-to-coin" ? "#caa84c" : "transparent",
                            color: convertDirection === "usdt-to-coin" ? "#111" : "#f7dc8a",
                            borderColor: "rgba(202,168,76,0.6)"
                        } }, "USDT \u2192 Coin")),
                react_1["default"].createElement(material_1.TextField, { fullWidth: true, type: "number", label: convertDirection === "coin-to-usdt" ? "Coins" : "USDT", value: convertAmount || "", onChange: function (e) { return setConvertAmount(+e.target.value); }, helperText: convertDirection === "coin-to-usdt"
                        ? "You\u2019ll receive " + convertedValue + " USDT (100 coins = 1 USDT)"
                        : "You\u2019ll receive " + convertedValue + " Coins (1 USDT = 100 coins)" })),
            react_1["default"].createElement(material_1.DialogActions, null,
                react_1["default"].createElement(material_1.Button, { onClick: function () { return setConvertOpen(false); } }, "Cancel"),
                react_1["default"].createElement(material_1.Button, { variant: "contained", sx: { backgroundColor: "#caa84c", fontWeight: 700 }, onClick: handleConvert }, "Convert"))),
        react_1["default"].createElement(material_1.Dialog, { open: transferOpen, onClose: function () { return setTransferOpen(false); }, fullWidth: true, fullScreen: isSmall, PaperProps: {
                sx: {
                    borderRadius: 4,
                    background: "rgba(18,24,35,0.7)",
                    backdropFilter: "blur(18px)",
                    color: "#fff"
                }
            } },
            react_1["default"].createElement(material_1.DialogTitle, null, "Transfer USDT"),
            react_1["default"].createElement(material_1.DialogContent, null,
                react_1["default"].createElement(material_1.TextField, { fullWidth: true, label: "Recipient", value: transferTo, onChange: function (e) { return setTransferTo(e.target.value); }, sx: { mb: 2 } }),
                react_1["default"].createElement(material_1.TextField, { fullWidth: true, type: "number", label: "Amount", value: transferAmount || "", onChange: function (e) { return setTransferAmount(+e.target.value); } })),
            react_1["default"].createElement(material_1.DialogActions, null,
                react_1["default"].createElement(material_1.Button, { onClick: function () { return setTransferOpen(false); } }, "Cancel"),
                react_1["default"].createElement(material_1.Button, { variant: "contained", sx: { backgroundColor: "#caa84c", fontWeight: 700 }, onClick: handleTransfer }, "Transfer")))));
};
