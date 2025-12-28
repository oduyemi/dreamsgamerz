"use strict";
exports.__esModule = true;
exports.CompetitionTooltip = void 0;
var material_1 = require("@mui/material");
var framer_motion_1 = require("framer-motion");
var AccessTime_1 = require("@mui/icons-material/AccessTime");
var Group_1 = require("@mui/icons-material/Group");
var CheckCircle_1 = require("@mui/icons-material/CheckCircle");
var Cancel_1 = require("@mui/icons-material/Cancel");
exports.CompetitionTooltip = function () { return (React.createElement(material_1.Box, { sx: {
        p: 1.5,
        borderRadius: 2,
        background: "rgba(20, 20, 20, 0.75)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(202,168,76,0.35)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        maxWidth: 230
    } },
    React.createElement(TooltipRow, { icon: React.createElement(Group_1["default"], null), text: "Players full \u2192 Match starts" }),
    React.createElement(TooltipRow, { icon: React.createElement(AnimatedTimer, null), text: "30 mins prep" }),
    React.createElement(TooltipRow, { icon: React.createElement(CheckCircle_1["default"], null), text: "Accept challenge" }),
    React.createElement(TooltipRow, { icon: React.createElement(AnimatedTimer, null), text: "1 min countdown" }),
    React.createElement(TooltipRow, { icon: React.createElement(Cancel_1["default"], null), text: "Miss \u2192 Lose" }))); };
var TooltipRow = function (_a) {
    var icon = _a.icon, text = _a.text;
    return (React.createElement(material_1.Box, { display: "flex", alignItems: "center", gap: 1, mb: 0.6 },
        React.createElement(material_1.Box, { sx: { color: "#caa84c" } }, icon),
        React.createElement(material_1.Typography, { variant: "caption", sx: { color: "#fff", fontWeight: 600, letterSpacing: 0.3 } }, text)));
};
var AnimatedTimer = function () { return (React.createElement(framer_motion_1.motion.div, { animate: { rotate: 360 }, transition: {
        repeat: Infinity,
        duration: 3,
        ease: "linear"
    } },
    React.createElement(AccessTime_1["default"], { fontSize: "small" }))); };
