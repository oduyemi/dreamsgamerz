"use strict";
exports.__esModule = true;
exports.MovingPictureGameTab = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var framer_motion_1 = require("framer-motion");
var Star_1 = require("@mui/icons-material/Star");
var Favorite_1 = require("@mui/icons-material/Favorite");
var InfoOutlined_1 = require("@mui/icons-material/InfoOutlined");
var CompetitionDetailsModal_1 = require("./CompetitionDetailsModal");
var CompetitionTooltip_1 = require("./CompetitionTooltip");
var TournamentLobby_1 = require("./TournamentLobby");
exports.MovingPictureGameTab = function () {
    var _a = react_1.useState(5), lives = _a[0], setLives = _a[1];
    var _b = react_1.useState(false), detailsOpen = _b[0], setDetailsOpen = _b[1];
    var _c = react_1.useState(null), selectedComp = _c[0], setSelectedComp = _c[1];
    var _d = react_1.useState(false), showLobby = _d[0], setShowLobby = _d[1];
    /* ---------------- DATA ---------------- */
    var competitions = [
        { players: 2, prize: "50 USDT", comingSoon: false },
        { players: 2, prize: "100 USDT", comingSoon: false },
        { players: 2, prize: "500 USDT", comingSoon: false },
        { players: 2, prize: "1000 USDT", comingSoon: false },
        { players: 2, prize: "100000 USDT", comingSoon: false },
        { players: 2, prize: "500000 USDT", comingSoon: true },
    ];
    var lifePackages = [
        { cost: 1, lives: 3, coins: 100 },
        { cost: 2, lives: 7, coins: 200 },
        { cost: 3, lives: 11, coins: 300 },
    ];
    var handleBuyLives = function (extraLives) {
        setLives(function (prev) { return prev + extraLives; });
    };
    /* ---------------- TOURNAMENT LOBBY ---------------- */
    if (showLobby && selectedComp) {
        return (react_1["default"].createElement(material_1.Box, { sx: {
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(145deg,#eef2f3,#dfe9f3)",
                p: 3
            } },
            react_1["default"].createElement(TournamentLobby_1.TournamentLobby, { playersRequired: selectedComp.players, prize: selectedComp.prize, onStartGame: function () {
                    console.log("Game Started");
                    setShowLobby(false);
                } })));
    }
    /* ---------------- MAIN VIEW ---------------- */
    return (react_1["default"].createElement(material_1.Box, { sx: {
            width: "100%",
            py: 8,
            background: "linear-gradient(145deg,#eef2f3,#dfe9f3)"
        } },
        react_1["default"].createElement(material_1.Container, { maxWidth: "md" },
            react_1["default"].createElement(material_1.Box, { textAlign: "center", mb: 6 },
                react_1["default"].createElement(material_1.Typography, { variant: "h3", sx: {
                        fontWeight: 800,
                        background: "linear-gradient(45deg,#355cde,#caa84c)",
                        backgroundClip: "text",
                        color: "transparent"
                    } }, "Moving Picture Game"),
                react_1["default"].createElement(material_1.Typography, { variant: "subtitle1", sx: { opacity: 0.75 } }, "Stunning visuals. Premium rewards. Elite competition.")),
            react_1["default"].createElement(material_1.Card, { sx: {
                    p: 4,
                    borderRadius: 6,
                    background: "rgba(255,255,255,0.65)",
                    backdropFilter: "blur(18px)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.15)"
                } },
                react_1["default"].createElement(material_1.Box, { mb: 5, textAlign: "center" },
                    react_1["default"].createElement(material_1.Typography, { variant: "h5", fontWeight: 700 },
                        react_1["default"].createElement(Favorite_1["default"], { sx: { color: "#e63946", mr: 1 } }),
                        "Lives: ",
                        lives),
                    react_1["default"].createElement(material_1.Grid, { container: true, spacing: 3, justifyContent: "center", mt: 2 }, lifePackages.map(function (pkg, i) { return (react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, sm: 4, key: i },
                        react_1["default"].createElement(framer_motion_1.motion.div, { whileHover: { scale: 1.06 } },
                            react_1["default"].createElement(material_1.Card, { onClick: function () { return handleBuyLives(pkg.lives); }, sx: {
                                    cursor: "pointer",
                                    py: 3,
                                    borderRadius: 4,
                                    textAlign: "center",
                                    background: "linear-gradient(180deg,#ffffff,#f7f9fc)",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
                                } },
                                react_1["default"].createElement(material_1.Typography, { variant: "h6", fontWeight: 800 },
                                    pkg.cost,
                                    " USDT"),
                                react_1["default"].createElement(material_1.Typography, { color: "text.secondary" },
                                    "+",
                                    pkg.lives,
                                    " Lives"),
                                react_1["default"].createElement(material_1.Typography, { fontWeight: 600, color: "text.secondary" },
                                    "+",
                                    pkg.coins.toLocaleString(),
                                    " Coins"))))); }))),
                react_1["default"].createElement(material_1.Divider, { sx: { my: 4, borderColor: "rgba(202,168,76,0.4)" } }),
                react_1["default"].createElement(material_1.Typography, { variant: "h5", fontWeight: 800, textAlign: "center", sx: {
                        background: "linear-gradient(45deg,#355cde,#caa84c)",
                        backgroundClip: "text",
                        color: "transparent",
                        mb: 3
                    } }, "Competitions"),
                react_1["default"].createElement(material_1.Grid, { container: true, spacing: 3 }, competitions.map(function (comp, index) { return (react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, key: index },
                    react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
                        react_1["default"].createElement(material_1.Card, { sx: {
                                p: 2,
                                borderRadius: 5,
                                background: "linear-gradient(180deg,#ffffff,#f7f9fc)",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
                            } },
                            react_1["default"].createElement(material_1.CardContent, null,
                                react_1["default"].createElement(material_1.Box, { display: "flex", justifyContent: "space-between" },
                                    react_1["default"].createElement(material_1.Box, null,
                                        react_1["default"].createElement(Star_1["default"], { sx: { fontSize: 42, color: "#caa84c" } }),
                                        react_1["default"].createElement(material_1.Typography, { fontWeight: 700 },
                                            comp.players,
                                            " Players")),
                                    react_1["default"].createElement(material_1.Box, { textAlign: "right" },
                                        react_1["default"].createElement(material_1.Box, { display: "flex", alignItems: "center", gap: 0.5 },
                                            react_1["default"].createElement(material_1.Typography, { fontWeight: 700 }, comp.prize),
                                            !comp.comingSoon && (react_1["default"].createElement(material_1.Tooltip, { title: react_1["default"].createElement(CompetitionTooltip_1.CompetitionTooltip, null), arrow: true },
                                                react_1["default"].createElement(material_1.IconButton, { size: "small", sx: { color: "#caa84c" } },
                                                    react_1["default"].createElement(InfoOutlined_1["default"], { fontSize: "small" }))))),
                                        react_1["default"].createElement(material_1.Typography, { variant: "body2", color: "text.secondary" }, "Prize Pool"))),
                                react_1["default"].createElement(material_1.Box, { display: "flex", gap: 2, mt: 3 },
                                    react_1["default"].createElement(material_1.Button, { variant: "outlined", fullWidth: true, disabled: comp.comingSoon, onClick: function () {
                                            setSelectedComp(comp);
                                            setDetailsOpen(true);
                                        }, sx: {
                                            borderRadius: 2,
                                            borderColor: "#caa84c",
                                            color: "#caa84c",
                                            fontWeight: 700
                                        } }, "Details"),
                                    react_1["default"].createElement(material_1.Button, { variant: "contained", fullWidth: true, disabled: comp.comingSoon, onClick: function () {
                                            setSelectedComp(comp);
                                            setShowLobby(true);
                                        }, sx: {
                                            borderRadius: 2,
                                            fontWeight: 800,
                                            background: "linear-gradient(45deg,#caa84c,#b5944a)"
                                        } }, "Join Now"))))))); })))),
        selectedComp && (react_1["default"].createElement(CompetitionDetailsModal_1.CompetitionDetailsModal, { open: detailsOpen, onClose: function () { return setDetailsOpen(false); }, players: selectedComp.players, prize: selectedComp.prize }))));
};
exports["default"] = exports.MovingPictureGameTab;
