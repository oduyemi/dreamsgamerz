"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Profile = void 0;
var react_1 = require("@ionic/react");
var icons_1 = require("ionicons/icons");
var material_1 = require("@mui/material");
var framer_motion_1 = require("framer-motion");
var react_2 = require("react");
var react_router_dom_1 = require("react-router-dom");
var _a = react_2.useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    membership: 'Premium',
    points: 1250,
    coins: 0,
    following: 150,
    followers: 320,
    likes: 450,
    referrals: 12,
    joined: 'Member since Jan 2023',
    verified: true
}), user = _a[0], setUser = _a[1];
exports.Profile = function () {
    var theme = material_1.useTheme();
    var isSmall = material_1.useMediaQuery(theme.breakpoints.down('sm'));
    var history = react_router_dom_1.useHistory();
    var _a = react_2.useState({
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        membership: 'Premium',
        points: 1250,
        coins: 0,
        following: 150,
        followers: 320,
        likes: 450,
        referrals: 12,
        joined: 'Member since Jan 2023',
        verified: true
    }), user = _a[0], setUser = _a[1];
    var _b = react_2.useState([
        { id: 1, title: 'Funny Cat Compilation', category: 'funny', monetized: true, views: 25 },
        { id: 2, title: 'Short Drama Scene', category: 'short drama', monetized: false, views: 0 }
    ]), videos = _b[0], setVideos = _b[1];
    var _c = react_2.useState(false), uploadOpen = _c[0], setUploadOpen = _c[1];
    var _d = react_2.useState(''), videoTitle = _d[0], setVideoTitle = _d[1];
    var _e = react_2.useState(''), videoCategory = _e[0], setVideoCategory = _e[1];
    var handleUploadVideo = function () {
        if (!videoTitle || !videoCategory)
            return alert('Please enter title and category.');
        setVideos(function (prev) { return __spreadArrays(prev, [
            {
                id: Date.now(),
                title: videoTitle,
                category: videoCategory,
                monetized: false,
                views: 0
            }
        ]); });
        setVideoTitle('');
        setVideoCategory('');
        setUploadOpen(false);
    };
    var totalPoints = videos.reduce(function (acc, vid) { return acc + (vid.monetized ? vid.views * 100 : 0); }, user.points);
    var coinsFromPoints = Math.floor(totalPoints / 1500) * 100;
    return (React.createElement(material_1.Box, { sx: { backgroundColor: '#ffffff', paddingBottom: '100px' } },
        React.createElement(material_1.Box, { sx: {
                backgroundColor: '#111',
                padding: '16px 0',
                textAlign: 'center',
                borderBottom: '1px solid rgba(202,168,76,0.2)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                marginBottom: 3
            } },
            React.createElement(material_1.Typography, { sx: {
                    color: '#caa84c',
                    fontWeight: 700,
                    fontSize: isSmall ? '1.2rem' : '1.5rem'
                } }, "Creator Dashboard")),
        React.createElement(material_1.Box, { px: 2, pt: 2, pb: 6, maxWidth: 500, mx: "auto" },
            React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } },
                React.createElement(material_1.Paper, { sx: {
                        p: 3,
                        borderRadius: 3,
                        mb: 3,
                        backgroundColor: '#fff',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(202,168,76,0.2)'
                    } },
                    React.createElement(material_1.Stack, { spacing: 2, alignItems: "center" },
                        React.createElement(material_1.Badge, { overlap: "circular", anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, badgeContent: React.createElement(material_1.IconButton, { size: "small", sx: { backgroundColor: '#caa84c', p: 0.5 } },
                                React.createElement(react_1.IonIcon, { icon: icons_1.pencilOutline, style: { fontSize: 16, color: '#fff' } })) },
                            React.createElement(material_1.Avatar, { sx: {
                                    width: 120,
                                    height: 120,
                                    backgroundColor: 'rgba(202,168,76,0.1)',
                                    border: '3px solid #caa84c',
                                    boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
                                } },
                                React.createElement(react_1.IonIcon, { icon: icons_1.person, style: { fontSize: 56, color: '#caa84c' } }))),
                        React.createElement(material_1.Button, { variant: "outlined", size: "small", sx: {
                                borderColor: '#caa84c',
                                color: '#caa84c',
                                textTransform: 'none',
                                mt: 1,
                                '&:hover': { backgroundColor: 'rgba(202,168,76,0.08)' }
                            } }, "Earn More Points"),
                        React.createElement(material_1.Stack, { direction: "row", alignItems: "center", spacing: 1 },
                            React.createElement(material_1.Typography, { sx: {
                                    fontSize: isSmall ? 20 : 24,
                                    fontWeight: 'bold',
                                    color: '#222'
                                } }, user.name),
                            user.verified && (React.createElement(react_1.IonIcon, { icon: icons_1.shieldCheckmarkOutline, style: { color: '#4CAF50', fontSize: 20 } }))),
                        React.createElement(material_1.Typography, { sx: { color: 'text.secondary' } }, user.email),
                        React.createElement(material_1.Paper, { sx: {
                                mt: 2,
                                p: 2,
                                borderRadius: 2,
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                gap: 2,
                                backgroundColor: 'rgba(202,168,76,0.05)'
                            } }, ['following', 'followers', 'likes'].map(function (stat) { return (React.createElement(material_1.Box, { key: stat, textAlign: "center" },
                            React.createElement(material_1.Typography, { fontWeight: "bold", color: "#caa84c" }, user[stat]),
                            React.createElement(material_1.Typography, { fontSize: 12, color: "text.secondary" }, stat.charAt(0).toUpperCase() + stat.slice(1)))); })),
                        React.createElement(material_1.Stack, { direction: "row", spacing: 1, justifyContent: "center", mt: 2, alignItems: "center" },
                            React.createElement(material_1.Chip, { label: user.membership, size: "small", sx: {
                                    backgroundColor: 'rgba(202,168,76,0.15)',
                                    color: '#caa84c',
                                    fontWeight: 600
                                } }),
                            React.createElement(material_1.Chip, { label: "Referrals: " + user.referrals, size: "small", sx: {
                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                    color: '#333'
                                } }),
                            React.createElement(material_1.IconButton, { size: "small", onClick: function () { return history.push('/referral'); } },
                                React.createElement(react_1.IonIcon, { icon: icons_1.arrowForwardOutline, style: { color: '#caa84c' } }))),
                        React.createElement(material_1.Typography, { fontSize: 12, color: "text.secondary", sx: { mt: 1 } }, user.joined))),
                React.createElement(material_1.Paper, { sx: {
                        p: 3,
                        mb: 3,
                        borderRadius: 3,
                        backgroundColor: '#fff',
                        border: '1px solid rgba(202,168,76,0.2)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    } },
                    React.createElement(material_1.Stack, { direction: isSmall ? 'column' : 'row', spacing: 2, justifyContent: "space-between", alignItems: "center" },
                        React.createElement(material_1.Chip, { label: totalPoints + " pts", icon: React.createElement(react_1.IonIcon, { icon: icons_1.trophyOutline, style: { fontSize: 16 } }), sx: {
                                backgroundColor: 'rgba(202,168,76,0.1)',
                                color: '#caa84c',
                                fontWeight: 600
                            } }),
                        React.createElement(material_1.Chip, { label: user.coins + " coins", sx: {
                                backgroundColor: 'rgba(202,168,76,0.1)',
                                color: '#caa84c',
                                fontWeight: 600
                            } }),
                        React.createElement(material_1.Button, { variant: "contained", sx: {
                                backgroundColor: '#caa84c',
                                color: '#fff',
                                borderRadius: 2,
                                '&:hover': { backgroundColor: '#b79535' }
                            }, onClick: function () {
                                if (coinsFromPoints > 0) {
                                    setUser(function (prev) { return (__assign(__assign({}, prev), { coins: prev.coins + coinsFromPoints })); });
                                    setVideos(function (prev) {
                                        return prev.map(function (v) { return (__assign(__assign({}, v), { monetized: false, views: 0 })); });
                                    });
                                    alert("Converted " + coinsFromPoints + " coins!");
                                }
                                else {
                                    alert("Need 1500 points for 100 coins.");
                                }
                            } }, "Convert Points to Coins"))),
                React.createElement(material_1.Paper, { sx: {
                        p: 2,
                        mb: 3,
                        borderRadius: 3,
                        backgroundColor: '#fff',
                        border: '1px solid rgba(202,168,76,0.2)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    } },
                    React.createElement(material_1.Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", mb: 2 },
                        React.createElement(material_1.Typography, { fontWeight: "bold", color: "#333" }, "Your Videos"),
                        React.createElement(material_1.Button, { variant: "contained", size: "small", sx: {
                                borderRadius: 2,
                                backgroundColor: '#caa84c',
                                '&:hover': { backgroundColor: '#b79535' }
                            }, onClick: function () { return setUploadOpen(true); } }, "Upload Video")),
                    React.createElement(material_1.Stack, { spacing: 1 }, videos.map(function (video) { return (React.createElement(material_1.Paper, { key: video.id, sx: {
                            p: 2,
                            borderRadius: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'rgba(202,168,76,0.05)',
                            cursor: 'pointer',
                            transition: '0.2s',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.08)'
                            }
                        } },
                        React.createElement(material_1.Box, null,
                            React.createElement(material_1.Typography, { fontWeight: 500, color: "#222" }, video.title),
                            React.createElement(material_1.Typography, { fontSize: 12, color: "text.secondary" },
                                video.category,
                                " \u2022 ",
                                video.monetized ? 'Monetized' : 'Not Monetized')),
                        video.monetized && (React.createElement(material_1.Chip, { label: video.views * 100 + " pts", size: "small", sx: {
                                backgroundColor: 'rgba(202,168,76,0.1)',
                                color: '#caa84c'
                            } })))); }))),
                React.createElement(material_1.Paper, { sx: {
                        p: 3,
                        mb: 4,
                        borderRadius: 3,
                        border: '1px solid rgba(202,168,76,0.2)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    } },
                    React.createElement(material_1.Typography, { fontWeight: "bold", color: "#333", mb: 2 }, "Best way to make money"),
                    ['Short Drama Creators', 'Animation Creators'].map(function (type, i) { return (React.createElement(material_1.Paper, { key: i, sx: {
                            p: 2,
                            mb: 2,
                            borderRadius: 2,
                            backgroundColor: 'rgba(202,168,76,0.05)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        } },
                        React.createElement(material_1.Typography, null, type),
                        React.createElement(material_1.Button, { variant: "contained", size: "small", component: "label", sx: {
                                backgroundColor: '#caa84c',
                                '&:hover': { backgroundColor: '#b79535' }
                            } },
                            "Upload Video",
                            React.createElement("input", { hidden: true, accept: "video/*", type: "file" })))); })),
                React.createElement(material_1.Dialog, { open: uploadOpen, onClose: function () { return setUploadOpen(false); } },
                    React.createElement(material_1.DialogTitle, null, "Upload Video"),
                    React.createElement(material_1.DialogContent, null,
                        React.createElement(material_1.TextField, { fullWidth: true, label: "Video Title", value: videoTitle, onChange: function (e) { return setVideoTitle(e.target.value); }, sx: { mb: 2 } }),
                        React.createElement(material_1.TextField, { select: true, fullWidth: true, label: "Category", value: videoCategory, onChange: function (e) { return setVideoCategory(e.target.value); } }, ['animations', 'funny', 'short drama', 'inspiring', 'reels'].map(function (cat) { return (React.createElement(material_1.MenuItem, { key: cat, value: cat }, cat)); }))),
                    React.createElement(material_1.DialogActions, null,
                        React.createElement(material_1.Button, { onClick: function () { return setUploadOpen(false); } }, "Cancel"),
                        React.createElement(material_1.Button, { variant: "contained", sx: {
                                backgroundColor: '#caa84c',
                                color: '#fff',
                                '&:hover': { backgroundColor: '#b79535' }
                            }, onClick: handleUploadVideo }, "Upload"))),
                React.createElement(material_1.Box, { mt: 4, textAlign: "center" },
                    React.createElement(material_1.Button, { variant: "contained", color: "error", fullWidth: true, sx: {
                            borderRadius: 2,
                            py: 1.2,
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            boxShadow: '0 4px 12px rgba(244,67,54,0.2)'
                        } }, "Sign Out"))))));
};
