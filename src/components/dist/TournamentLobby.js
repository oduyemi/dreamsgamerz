"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.TournamentLobby = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var framer_motion_1 = require("framer-motion");
var Group_1 = require("@mui/icons-material/Group");
var PlayArrow_1 = require("@mui/icons-material/PlayArrow");
var Person_1 = require("@mui/icons-material/Person");
exports.TournamentLobby = function (_a) {
    var playersRequired = _a.playersRequired, prize = _a.prize, onStartGame = _a.onStartGame;
    var _b = react_1.useState(["You"]), players = _b[0], setPlayers = _b[1];
    var _c = react_1.useState(false), joined = _c[0], setJoined = _c[1];
    var handleJoinTournament = function () {
        if (!joined) {
            setJoined(true);
            // Mock other players joining
            setTimeout(function () {
                setPlayers(function (prev) { return __spreadArrays(prev, ["Player_02"]); });
            }, 1200);
            setTimeout(function () {
                setPlayers(function (prev) { return __spreadArrays(prev, ["Player_03"]); });
            }, 2200);
        }
    };
    var canStartGame = players.length >= playersRequired;
    return (react_1["default"].createElement(material_1.Card, { sx: {
            p: 4,
            borderRadius: 6,
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(18px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            maxWidth: 520,
            mx: "auto"
        } },
        react_1["default"].createElement(material_1.Box, { textAlign: "center", mb: 3 },
            react_1["default"].createElement(material_1.Typography, { variant: "h5", fontWeight: 800, sx: {
                    background: "linear-gradient(45deg,#355cde,#caa84c)",
                    backgroundClip: "text",
                    color: "transparent"
                } }, "Tournament Lobby"),
            react_1["default"].createElement(material_1.Typography, { variant: "body2", sx: { opacity: 0.75 } },
                "Prize Pool: ",
                prize)),
        react_1["default"].createElement(material_1.Divider, { sx: { mb: 3 } }),
        react_1["default"].createElement(material_1.Stack, { direction: "row", alignItems: "center", spacing: 1, mb: 2 },
            react_1["default"].createElement(Group_1["default"], { sx: { color: "#caa84c" } }),
            react_1["default"].createElement(material_1.Typography, { fontWeight: 700 },
                "Players Joined: ",
                players.length,
                "/",
                playersRequired),
            canStartGame && (react_1["default"].createElement(material_1.Chip, { label: "Ready", color: "success", size: "small", sx: { ml: "auto", fontWeight: 700 } }))),
        react_1["default"].createElement(material_1.Stack, { spacing: 1.5, mb: 4 }, players.map(function (player, index) { return (react_1["default"].createElement(framer_motion_1.motion.div, { key: player, initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } },
            react_1["default"].createElement(material_1.Box, { display: "flex", alignItems: "center", gap: 1.5, sx: {
                    p: 1.5,
                    borderRadius: 3,
                    background: "#f7f9fc",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                } },
                react_1["default"].createElement(material_1.Avatar, { sx: {
                        bgcolor: index === 0 ? "#caa84c" : "#355cde",
                        width: 36,
                        height: 36
                    } },
                    react_1["default"].createElement(Person_1["default"], null)),
                react_1["default"].createElement(material_1.Typography, { fontWeight: 600 },
                    player,
                    player === "You" && (react_1["default"].createElement(material_1.Typography, { component: "span", fontSize: 12, sx: { ml: 0.8, opacity: 0.6 } }, "(You)")))))); })),
        !joined ? (react_1["default"].createElement(material_1.Button, { fullWidth: true, size: "large", onClick: handleJoinTournament, sx: {
                borderRadius: 3,
                py: 1.4,
                fontWeight: 800,
                background: "#e6b800",
                color: "#1b1b1b",
                "&:hover": {
                    background: "linear-gradient(45deg,#dfc178,#b69548)",
                    boxShadow: "0 8px 24px rgba(202,168,76,0.5)"
                }
            } }, "Join Tournament")) : (react_1["default"].createElement(material_1.Button, { fullWidth: true, size: "large", disabled: !canStartGame, startIcon: react_1["default"].createElement(PlayArrow_1["default"], null), onClick: onStartGame, sx: {
                borderRadius: 3,
                py: 1.4,
                fontWeight: 800,
                background: canStartGame
                    ? "linear-gradient(45deg,#355cde,#1d4ed8)"
                    : "#ccc",
                color: "#fff"
            } }, "Start Game"))));
};
