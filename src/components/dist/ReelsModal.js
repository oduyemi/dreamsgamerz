"use client";
"use strict";
exports.__esModule = true;
exports.ReelsModal = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var icons_1 = require("ionicons/icons");
var react_2 = require("@ionic/react");
var reelsData = [
    {
        id: 1,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        coverUrl: "https://picsum.photos/id/1015/600/800",
        username: "@oceanview",
        caption: "Chasing sunsets 🌅",
        likes: 128,
        comments: 45
    },
    {
        id: 2,
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        coverUrl: "https://picsum.photos/id/1011/600/800",
        username: "@traveler",
        caption: "Exploring new cities ✈️",
        likes: 542,
        comments: 78
    },
    {
        id: 3,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        coverUrl: "https://picsum.photos/id/1025/600/800",
        username: "@foodie",
        caption: "Street food vibes 🍜",
        likes: 891,
        comments: 112
    },
    {
        id: 4,
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        coverUrl: "https://picsum.photos/id/1019/600/800",
        username: "@naturelover",
        caption: "Mountain hikes 🏔️",
        likes: 310,
        comments: 64
    }
];
exports.ReelsModal = function (_a) {
    var open = _a.open, onClose = _a.onClose;
    var theme = material_1.useTheme();
    var _b = react_1.useState(0), currentIndex = _b[0], setCurrentIndex = _b[1];
    var startX = react_1.useRef(null);
    var isDragging = react_1.useRef(false);
    var handleTouchStart = function (e) {
        startX.current = e.touches[0].clientX;
        isDragging.current = true;
    };
    var handleTouchEnd = function (e) {
        if (!isDragging.current || startX.current === null)
            return;
        var diff = startX.current - e.changedTouches[0].clientX;
        if (diff > 50)
            handleNext();
        if (diff < -50)
            handlePrev();
        isDragging.current = false;
        startX.current = null;
    };
    var handleMouseDown = function (e) {
        startX.current = e.clientX;
        isDragging.current = true;
    };
    var handleMouseUp = function (e) {
        if (!isDragging.current || startX.current === null)
            return;
        var diff = startX.current - e.clientX;
        if (diff > 50)
            handleNext();
        if (diff < -50)
            handlePrev();
        isDragging.current = false;
        startX.current = null;
    };
    var handlePrev = function () { return setCurrentIndex(function (prev) { return Math.max(prev - 1, 0); }); };
    var handleNext = function () { return setCurrentIndex(function (prev) { return Math.min(prev + 1, reelsData.length - 1); }); };
    return (react_1["default"].createElement(material_1.Modal, { open: open, onClose: onClose, sx: { display: "flex", justifyContent: "center", alignItems: "center" } },
        react_1["default"].createElement(material_1.Box, { onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd, onMouseDown: handleMouseDown, onMouseUp: handleMouseUp, sx: {
                width: { xs: "95%", sm: "80%", md: "70%" },
                height: { xs: "80%", sm: "85%", md: "90%" },
                bgcolor: theme.palette.background.paper,
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
                display: "flex",
                alignItems: "center",
                boxShadow: 24,
                cursor: "grab",
                userSelect: "none"
            } },
            currentIndex > 0 && (react_1["default"].createElement(material_1.Typography, { sx: {
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    userSelect: "none"
                } }, "\u2190 Swipe")),
            currentIndex < reelsData.length - 1 && (react_1["default"].createElement(material_1.Typography, { sx: {
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    userSelect: "none"
                } }, "Swipe \u2192")),
            react_1["default"].createElement(material_1.Box, { sx: {
                    flex: 1,
                    display: "flex",
                    transition: "transform 0.5s ease",
                    transform: "translateX(-" + currentIndex * 100 + "%)",
                    height: "100%"
                } }, reelsData.map(function (reel) { return (react_1["default"].createElement(material_1.Box, { key: reel.id, sx: { flex: "0 0 100%", height: "100%", position: "relative" } },
                react_1["default"].createElement("video", { src: reel.videoUrl, controls: true, autoPlay: true, loop: true, muted: true, style: { width: "100%", height: "100%", objectFit: "cover" } }),
                react_1["default"].createElement(material_1.Box, { sx: {
                        position: "absolute",
                        bottom: 16,
                        left: 16,
                        color: "#fff",
                        textShadow: "0px 2px 6px rgba(0,0,0,0.7)",
                        maxWidth: "70%"
                    } },
                    react_1["default"].createElement(material_1.Typography, { variant: "subtitle1", fontWeight: "bold" }, reel.username),
                    react_1["default"].createElement(material_1.Typography, { variant: "body2" }, reel.caption)),
                react_1["default"].createElement(material_1.Stack, { direction: "column", spacing: 2, sx: {
                        position: "absolute",
                        right: 16,
                        bottom: 80,
                        alignItems: "center"
                    } },
                    react_1["default"].createElement(material_1.Box, { textAlign: "center" },
                        react_1["default"].createElement(material_1.IconButton, { sx: { bgcolor: "rgba(255,255,255,0.1)" } },
                            react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.heart })),
                        react_1["default"].createElement(material_1.Typography, { fontSize: 12, color: "white" }, reel.likes)),
                    react_1["default"].createElement(material_1.Box, { textAlign: "center" },
                        react_1["default"].createElement(material_1.IconButton, { sx: { bgcolor: "rgba(255,255,255,0.1)" } },
                            react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.chatbubble })),
                        react_1["default"].createElement(material_1.Typography, { fontSize: 12, color: "white" }, reel.comments)),
                    react_1["default"].createElement(material_1.IconButton, { sx: { bgcolor: "rgba(255,255,255,0.1)" } },
                        react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.paperPlane })),
                    react_1["default"].createElement(material_1.IconButton, { sx: { bgcolor: "rgba(255,255,255,0.1)" } },
                        react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.ellipsisVertical }))))); })),
            react_1["default"].createElement(material_1.Stack, { direction: "row", spacing: 1, sx: {
                    position: "absolute",
                    bottom: 16,
                    left: "50%",
                    transform: "translateX(-50%)"
                } }, reelsData.map(function (_, idx) { return (react_1["default"].createElement(material_1.Box, { key: idx, sx: {
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: idx === currentIndex ? theme.palette.primary.main : "rgba(255,255,255,0.5)",
                    transition: "all 0.3s"
                } })); })))));
};
