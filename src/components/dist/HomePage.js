"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.HomePage = void 0;
var react_1 = require("@ionic/react");
var icons_1 = require("ionicons/icons");
var react_2 = require("react");
var material_1 = require("@mui/material");
var framer_motion_1 = require("framer-motion");
var gi_1 = require("react-icons/gi");
var updates = [
    '🎮 New Game Available',
    '🔥 Tournament Live',
    '🛒 New Product in Store',
];
exports.HomePage = function () {
    var _a = react_2.useState(true), showBalance = _a[0], setShowBalance = _a[1];
    var _b = react_2.useState(true), hasNotifications = _b[0], setHasNotifications = _b[1];
    var _c = react_2.useState(0), updateIndex = _c[0], setUpdateIndex = _c[1];
    var theme = material_1.useTheme();
    var isSmall = material_1.useMediaQuery(theme.breakpoints.down('sm'));
    var controls = framer_motion_1.useAnimation();
    // Sample values (could come from API later)
    var gameDollars = 100;
    var coinBalance = 2500;
    var coinsToUsdRate = 100;
    var totalUsd = react_2.useMemo(function () {
        return gameDollars + coinBalance / coinsToUsdRate;
    }, [gameDollars, coinBalance]);
    // Rotate updates
    react_2.useEffect(function () {
        var interval = setInterval(function () {
            setUpdateIndex(function (prev) { return (prev + 1) % updates.length; });
        }, 3000);
        return function () { return clearInterval(interval); };
    }, []);
    // Subtle glow pulse animation
    var pulseGlow = material_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    0% { transform: scale(1); opacity: 0.7; }\n    50% { transform: scale(1.05); opacity: 1; }\n    100% { transform: scale(1); opacity: 0.7; }\n  "], ["\n    0% { transform: scale(1); opacity: 0.7; }\n    50% { transform: scale(1.05); opacity: 1; }\n    100% { transform: scale(1); opacity: 0.7; }\n  "])));
    // Fade + lift animation variants
    var fadeLiftVariant = {
        hidden: { opacity: 0, y: 20, scale: 0.97 },
        visible: function (i) {
            if (i === void 0) { i = 0; }
            return ({
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    delay: 0.3 + i * 0.08,
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1]
                }
            });
        }
    };
    react_2.useEffect(function () {
        var timer = setTimeout(function () {
            controls.start('visible');
        }, 300);
        return function () { return clearTimeout(timer); };
    }, [controls]);
    return (React.createElement(material_1.Box, { sx: {
            backgroundColor: '#ffffff',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            transform: isSmall ? 'scale(0.95)' : 'scale(1)',
            transformOrigin: 'center'
        } },
        React.createElement(material_1.Box, { sx: {
                position: 'absolute',
                top: 16,
                width: '100%',
                maxWidth: 600,
                px: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 10
            } },
            React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } },
                React.createElement(material_1.Box, { sx: {
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
                            transform: 'translateY(-1px)'
                        }
                    } },
                    React.createElement(material_1.Stack, { spacing: 0.3 },
                        React.createElement(material_1.Typography, { fontSize: 11, fontWeight: 600, color: "#caa84c", textTransform: "uppercase" }, "Updates"),
                        React.createElement(framer_motion_1.motion.div, { key: updateIndex, initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } },
                            React.createElement(material_1.Typography, { fontSize: 13, fontWeight: 500, noWrap: true }, updates[updateIndex]))))),
            React.createElement(material_1.IconButton, { "aria-label": "Notifications", sx: {
                    color: '#5b7fff',
                    '&:hover': { backgroundColor: 'rgba(91,127,255,0.08)' }
                }, onClick: function () { return setHasNotifications(false); } },
                React.createElement(material_1.Badge, { color: "error", variant: "dot", invisible: !hasNotifications },
                    React.createElement(react_1.IonIcon, { icon: icons_1.notifications, style: { fontSize: 24 } })))),
        React.createElement(framer_motion_1.motion.div, { custom: 0, variants: fadeLiftVariant, initial: "hidden", animate: controls, style: { width: '100%', maxWidth: 600, marginTop: 96 } },
            React.createElement(material_1.Box, { sx: {
                    background: 'linear-gradient(145deg, #ffffff, #fafafa)',
                    borderRadius: 3,
                    p: 3,
                    mx: 2,
                    mb: 1,
                    boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
                    border: '1px solid #f0f0f0'
                } },
                React.createElement(material_1.Grid, { container: true, spacing: 2, justifyContent: "space-around" }, ['Game Dollars', 'Coin Balance', 'Coin Earned'].map(function (label, index) { return (React.createElement(material_1.Grid, { item: true, xs: 4, key: index },
                    React.createElement(material_1.Stack, { spacing: 0.5, alignItems: "center" },
                        React.createElement(material_1.Typography, { fontSize: 12, color: "text.secondary" }, label),
                        React.createElement(material_1.Stack, { direction: "row", alignItems: "center", spacing: 0.5 },
                            showBalance ? (index === 0 ? (React.createElement(material_1.Typography, { fontWeight: "bold", color: "#caa84c" },
                                "$",
                                gameDollars.toFixed(2))) : index === 1 ? (React.createElement(React.Fragment, null,
                                React.createElement(gi_1.GiTwoCoins, { style: { fontSize: 18, color: '#caa84c' } }),
                                React.createElement(material_1.Typography, { fontWeight: "bold" }, coinBalance.toLocaleString()))) : (React.createElement(material_1.Typography, { fontWeight: "bold" }, "150"))) : (React.createElement(material_1.Typography, null, "\u2022\u2022\u2022\u2022")),
                            index === 0 && (React.createElement(react_1.IonIcon, { icon: showBalance ? icons_1.eye : icons_1.eyeOff, style: { fontSize: 16, cursor: 'pointer' }, onClick: function () { return setShowBalance(!showBalance); } })))))); })))),
        React.createElement(framer_motion_1.motion.div, { custom: 1, variants: fadeLiftVariant, initial: "hidden", animate: controls, style: { width: '100%', maxWidth: 600 } },
            React.createElement(material_1.Box, { sx: {
                    background: '#fafafa',
                    borderRadius: 3,
                    p: 3,
                    mx: 2,
                    mb: 1,
                    border: '1px solid #eee'
                } },
                React.createElement(material_1.Stack, { direction: "row", spacing: 2, alignItems: "center" },
                    React.createElement(material_1.Avatar, { src: "/images/avatar.png", sx: {
                            width: 64,
                            height: 64,
                            border: '2px solid #caa84c'
                        } }),
                    React.createElement(material_1.Stack, { flex: 1 },
                        React.createElement(material_1.Typography, { fontWeight: "bold", color: "#caa84c" }, "Dreamer"),
                        React.createElement(material_1.Typography, { variant: "body2" }, "Level 1 Adventurer"),
                        React.createElement(material_1.Box, { sx: { mt: 1, height: 6, backgroundColor: '#eee' } },
                            React.createElement(material_1.Box, { sx: { width: '30%', height: '100%', backgroundColor: '#caa84c' } })),
                        React.createElement(material_1.Typography, { variant: "caption" }, "120/400 XP to next level"))))),
        React.createElement(material_1.Box, { sx: {
                position: 'absolute',
                width: { xs: '180px', sm: '220px' },
                height: { xs: '180px', sm: '220px' },
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(202,168,76,0.25) 0%, transparent 70%)',
                filter: 'blur(12px)',
                animation: pulseGlow + " 4s ease-in-out infinite"
            } }),
        React.createElement("img", { src: "/images/hometoken.png", alt: "Dreams token", style: {
                width: isSmall ? '120px' : '150px',
                height: isSmall ? '120px' : '150px',
                animation: pulseGlow + " 4s ease-in-out infinite",
                filter: 'drop-shadow(0 0 8px rgba(202,168,76,0.5))'
            } }),
        controls && (React.createElement(framer_motion_1.motion.div, { custom: 3, variants: fadeLiftVariant, initial: "hidden", animate: controls, transition: { type: 'spring', stiffness: 80, damping: 12 } },
            React.createElement(material_1.Box, { sx: {
                    backgroundColor: '#fafafa',
                    borderRadius: 3,
                    mt: 2,
                    p: 2,
                    mx: 2,
                    mb: 3.5,
                    textAlign: 'center',
                    border: '1px solid #eee',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                } },
                React.createElement(material_1.Typography, { variant: "subtitle2", color: "#caa84c", fontWeight: 600 }, "Token Breakdown"),
                React.createElement(material_1.Divider, { sx: { my: 1.5 } }),
                React.createElement(material_1.Typography, { variant: "body2", color: "text.secondary" },
                    "USDT Owned: ",
                    React.createElement("b", null,
                        "$",
                        gameDollars.toFixed(2))),
                React.createElement(material_1.Typography, { variant: "body2", color: "text.secondary" },
                    "Coin Balance: ",
                    React.createElement("b", null,
                        coinBalance.toLocaleString(),
                        " coins"),
                    " \u2248 $",
                    (coinBalance / coinsToUsdRate).toFixed(2),
                    " USD"),
                React.createElement(material_1.Divider, { sx: { my: 1 } }),
                React.createElement(material_1.Typography, { variant: "body1", fontWeight: "bold", color: "#caa84c" },
                    "Total: $",
                    totalUsd.toFixed(2),
                    " USD"),
                React.createElement(material_1.Typography, { variant: "caption", color: "text.secondary" }, "(100 coins = 1 USD)"))))));
};
var templateObject_1;
