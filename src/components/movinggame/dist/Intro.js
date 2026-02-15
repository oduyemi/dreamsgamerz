"use strict";
exports.__esModule = true;
exports.MovingPhotoGame = void 0;
var material_1 = require("@mui/material");
var framer_motion_1 = require("framer-motion");
var react_1 = require("@ionic/react");
exports.MovingPhotoGame = function () {
    return (React.createElement(material_1.Box, { sx: {
            minHeight: "100svh",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            px: 2,
            pt: "env(safe-area-inset-top)",
            pb: "calc(env(safe-area-inset-bottom) + 20px)"
        } },
        React.createElement(material_1.Stack, { spacing: 3, sx: { mt: 4 } },
            React.createElement(material_1.Stack, { spacing: 1 },
                React.createElement(material_1.Typography, { fontSize: { xs: 24, sm: 28 }, fontWeight: 900, letterSpacing: -0.5 }, "Precision Arena"),
                React.createElement(material_1.Typography, { fontSize: { xs: 14, sm: 15 }, color: "text.secondary", maxWidth: 520 }, "Tap the moving target before it escapes. Speed and accuracy unlock higher rounds.")),
            React.createElement(material_1.Box, { sx: {
                    borderRadius: 5,
                    px: 2.5,
                    py: 2,
                    backgroundColor: "#ffffff",
                    border: "1px solid #f2f2f2",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.04)"
                } },
                React.createElement(material_1.Stack, { direction: "row", justifyContent: "space-between" }, [
                    { label: "Opponent", value: "0" },
                    { label: "Chances", value: "5" },
                    { label: "Record", value: "0W / 0L" },
                ].map(function (item) { return (React.createElement(material_1.Stack, { key: item.label, spacing: 0.5 },
                    React.createElement(material_1.Typography, { fontSize: 11, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.6 }, item.label),
                    React.createElement(material_1.Typography, { fontWeight: 800, fontSize: 15 }, item.value))); })))),
        React.createElement(material_1.Box, { sx: {
                position: "relative",
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                my: 4
            } },
            React.createElement(material_1.Box, { sx: {
                    position: "absolute",
                    width: { xs: 240, sm: 320 },
                    height: { xs: 240, sm: 320 },
                    borderRadius: "50%",
                    background: "radial-gradient(circle at center, rgba(202,168,76,0.08), transparent 70%)"
                } }),
            React.createElement(material_1.Box, { sx: {
                    position: "absolute",
                    width: { xs: 200, sm: 260 },
                    height: { xs: 200, sm: 260 },
                    borderRadius: "50%",
                    border: "1.5px solid rgba(202,168,76,0.3)"
                } }),
            React.createElement(framer_motion_1.motion.div, { animate: {
                    x: ["30vw", "-30vw", "30vw"],
                    y: ["22vh", "-22vh", "22vh"]
                }, transition: {
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "linear"
                }, style: { position: "absolute" } },
                React.createElement(material_1.Box, { sx: {
                        width: { xs: 110, sm: 140 },
                        height: { xs: 110, sm: 140 },
                        borderRadius: "50%",
                        p: "3px",
                        background: "linear-gradient(135deg, #caa84c, #f3d37a)",
                        boxShadow: "0 12px 40px rgba(202,168,76,0.35)"
                    } },
                    React.createElement(material_1.Box, { sx: {
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            overflow: "hidden",
                            backgroundColor: "#fff"
                        } },
                        React.createElement("img", { src: "/images/avatar.png", alt: "Target", style: {
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            } }))))),
        React.createElement(material_1.Stack, { spacing: 2, alignItems: "center" },
            React.createElement(material_1.Button, { component: react_1.IonRouterLink, href: "/games/moving-game/start", fullWidth: true, sx: {
                    maxWidth: 420,
                    fontSize: 16,
                    fontWeight: 800,
                    py: 1.7,
                    borderRadius: 5,
                    color: "#ffffff",
                    background: "linear-gradient(135deg, #caa84c, #b9922f)",
                    boxShadow: "0 14px 40px rgba(202,168,76,0.45)",
                    textTransform: "none",
                    transition: "all 0.25s ease",
                    "&:hover": {
                        background: "linear-gradient(135deg, #b9922f, #a87f21)"
                    },
                    "&:active": {
                        transform: "scale(0.96)",
                        boxShadow: "0 8px 22px rgba(202,168,76,0.35)"
                    }
                } }, "Enter Arena"),
            React.createElement(material_1.Typography, { fontSize: 12, color: "text.secondary", textAlign: "center" },
                "Win ",
                React.createElement("b", null, "4 rounds"),
                " to unlock the next tier."))));
};
