"use strict";
exports.__esModule = true;
exports.MovingPhotoGame = void 0;
var material_1 = require("@mui/material");
var framer_motion_1 = require("framer-motion");
var react_1 = require("@ionic/react");
exports.MovingPhotoGame = function () {
    return (React.createElement(material_1.Box, { sx: {
            minHeight: '100vh',
            background: 'radial-gradient(circle at top, #fff6dc 0%, #eef1f7 45%, #e6e9f0 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            px: 2
        } },
        React.createElement(material_1.Box, { sx: {
                width: '100%',
                maxWidth: 390,
                height: 700,
                borderRadius: 6,
                background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(245,246,250,0.75))',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(202,168,76,0.35)',
                boxShadow: '0 30px 70px rgba(0,0,0,0.14), inset 0 0 0 1px rgba(255,255,255,0.45)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 2.5,
                position: 'relative',
                overflow: 'hidden'
            } },
            React.createElement(material_1.Box, { sx: {
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, transparent 55%, rgba(0,0,0,0.06) 100%)',
                    pointerEvents: 'none'
                } }),
            React.createElement(material_1.Box, null,
                React.createElement(material_1.Typography, { fontSize: 11, fontWeight: 800, letterSpacing: 1, color: "#caa84c", textTransform: "uppercase", mb: 1 }, "Match Status"),
                React.createElement(material_1.Stack, { spacing: 0.4 },
                    React.createElement(material_1.Typography, { fontSize: 13 },
                        "Opponent Score: ",
                        React.createElement("b", null, "0")),
                    React.createElement(material_1.Typography, { fontSize: 13 },
                        "Chances Left: ",
                        React.createElement("b", null, "5")),
                    React.createElement(material_1.Stack, { direction: "row", spacing: 2 },
                        React.createElement(material_1.Typography, { fontSize: 13 },
                            "Win: ",
                            React.createElement("b", null, "0")),
                        React.createElement(material_1.Typography, { fontSize: 13 },
                            "Loss: ",
                            React.createElement("b", null, "0"))))),
            React.createElement(material_1.Stack, { flex: 1, alignItems: "center", justifyContent: "center", spacing: 3, sx: { position: 'relative' } },
                React.createElement(framer_motion_1.motion.div, { animate: { scale: [1, 1.08, 1] }, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }, style: {
                        position: 'absolute',
                        width: 230,
                        height: 230,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(202,168,76,0.45), transparent 70%)',
                        filter: 'blur(28px)'
                    } }),
                React.createElement(material_1.Box, { sx: {
                        width: 155,
                        height: 155,
                        borderRadius: '50%',
                        padding: '5px',
                        background: 'linear-gradient(135deg, #caa84c, #f7dc8a)',
                        boxShadow: '0 0 30px rgba(202,168,76,0.75), inset 0 0 12px rgba(255,255,255,0.65)'
                    } },
                    React.createElement(material_1.Box, { sx: {
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            backgroundColor: '#fff'
                        } },
                        React.createElement("img", { src: "/images/hometoken.png", alt: "Game Target", style: {
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            } }))),
                React.createElement(material_1.Button, { component: react_1.IonRouterLink, href: "/games/moving-game/start", sx: {
                        fontSize: 15,
                        fontWeight: 700,
                        color: '#caa84c',
                        letterSpacing: 0.5,
                        cursor: 'pointer',
                        px: 2.5,
                        py: 1,
                        borderRadius: 3,
                        border: '1px solid rgba(202,168,76,0.5)',
                        background: 'linear-gradient(145deg, #fff7df, #fff)',
                        boxShadow: '0 4px 14px rgba(202,168,76,0.35)',
                        transition: 'all 0.25s ease',
                        '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: '0 6px 20px rgba(202,168,76,0.5)'
                        }
                    } }, "Tap to Start")),
            React.createElement(material_1.Box, null,
                React.createElement(material_1.Divider, { sx: { mb: 1.5 } }),
                React.createElement(material_1.Stack, { spacing: 0.4 },
                    React.createElement(material_1.Typography, { fontSize: 13 },
                        "Total Chances: ",
                        React.createElement("b", null, "5")),
                    React.createElement(material_1.Typography, { fontSize: 13 },
                        "Wins No: ",
                        React.createElement("b", null, "0")),
                    React.createElement(material_1.Typography, { fontSize: 13 },
                        "Lose No: ",
                        React.createElement("b", null, "0")),
                    React.createElement(material_1.Typography, { fontSize: 12, color: "text.secondary" },
                        "Get ",
                        React.createElement("b", null, "two wins"),
                        " to qualify for the next round"))))));
};
