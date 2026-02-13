"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.GameArena = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var framer_motion_1 = require("framer-motion");
exports.GameArena = function (_a) {
    var lives = _a.lives, onLoseLife = _a.onLoseLife;
    var arenaRef = react_1.useRef(null);
    var swishSound = react_1.useRef(null);
    var _b = react_1.useState({ width: 0, height: 0 }), arenaSize = _b[0], setArenaSize = _b[1];
    var _c = react_1.useState([]), balls = _c[0], setBalls = _c[1];
    var _d = react_1.useState(0), score = _d[0], setScore = _d[1];
    var _e = react_1.useState(1), level = _e[0], setLevel = _e[1];
    /* ---------- RESPONSIVE SIZES ---------- */
    var imageSize = Math.max(24, arenaSize.width * 0.05);
    var circleSize = Math.min(arenaSize.width * 0.5, 320);
    var holeSize = circleSize * 0.6;
    /* ---------- INIT & RESIZE ---------- */
    react_1.useEffect(function () {
        var updateSize = function () {
            if (arenaRef.current) {
                setArenaSize({
                    width: arenaRef.current.offsetWidth,
                    height: arenaRef.current.offsetHeight
                });
            }
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        swishSound.current = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-basketball-swish-2013.mp3");
        return function () { return window.removeEventListener("resize", updateSize); };
    }, []);
    /* ---------- SPAWN BALLS ---------- */
    react_1.useEffect(function () {
        if (lives <= 0)
            return;
        var spawnInterval = setInterval(function () {
            spawnBall();
        }, Math.max(2000 - level * 150, 600));
        return function () { return clearInterval(spawnInterval); };
    }, [level, lives, arenaSize]);
    var spawnBall = function () {
        var width = arenaSize.width, height = arenaSize.height;
        if (!width || !height)
            return;
        var edge = Math.floor(Math.random() * 4);
        var startX = 0;
        var startY = 0;
        if (edge === 0) {
            startX = Math.random() * width;
            startY = -imageSize;
        }
        else if (edge === 1) {
            startX = width + imageSize;
            startY = Math.random() * height;
        }
        else if (edge === 2) {
            startX = Math.random() * width;
            startY = height + imageSize;
        }
        else {
            startX = -imageSize;
            startY = Math.random() * height;
        }
        setBalls(function (prev) { return __spreadArrays(prev, [
            { id: Date.now() + Math.random(), startX: startX, startY: startY },
        ]); });
    };
    /* ---------- GAME LOGIC ---------- */
    var handleHit = function (id) {
        var _a;
        setBalls(function (prev) { return prev.filter(function (b) { return b.id !== id; }); });
        setScore(function (prev) {
            var newScore = prev + 1;
            if (newScore % 5 === 0)
                setLevel(function (l) { return l + 1; });
            return newScore;
        });
        (_a = swishSound.current) === null || _a === void 0 ? void 0 : _a.play();
    };
    var handleMiss = function (id) {
        setBalls(function (prev) { return prev.filter(function (b) { return b.id !== id; }); });
        onLoseLife();
    };
    var centerX = arenaSize.width / 2 - imageSize / 2;
    var centerY = arenaSize.height / 2 - imageSize / 2;
    return (react_1["default"].createElement(material_1.Box, { ref: arenaRef, sx: {
            position: "relative",
            width: "100%",
            height: "100dvh",
            background: "radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)",
            overflow: "hidden"
        } },
        react_1["default"].createElement(material_1.Stack, { direction: "row", justifyContent: "space-between", sx: {
                position: "absolute",
                top: 20,
                left: 20,
                right: 20,
                px: 3,
                py: 1.5,
                borderRadius: 3,
                backdropFilter: "blur(12px)",
                background: "rgba(255,255,255,0.08)",
                color: "#fff"
            } },
            react_1["default"].createElement(material_1.Typography, { fontWeight: 700 },
                "Score: ",
                score),
            react_1["default"].createElement(material_1.Typography, { fontWeight: 700 },
                "Level: ",
                level),
            react_1["default"].createElement(material_1.Typography, { fontWeight: 700 },
                "Lives: ",
                lives)),
        react_1["default"].createElement(material_1.Box, { sx: {
                position: "absolute",
                width: circleSize,
                height: circleSize,
                borderRadius: "50%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            } },
            react_1["default"].createElement(material_1.Box, { sx: {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: "16px solid #ff6b00",
                    boxShadow: "0 0 40px rgba(255,107,0,0.6)"
                } }),
            react_1["default"].createElement(material_1.Box, { sx: {
                    width: holeSize,
                    height: holeSize,
                    borderRadius: "50%",
                    background: "#000"
                } })),
        balls.map(function (ball) { return (react_1["default"].createElement(framer_motion_1.motion.img, { key: ball.id, src: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png", initial: { x: ball.startX, y: ball.startY }, animate: {
                x: centerX,
                y: centerY,
                transition: {
                    duration: Math.max(3 - level * 0.2, 1),
                    ease: "linear"
                }
            }, onAnimationComplete: function () { return handleMiss(ball.id); }, onClick: function () { return handleHit(ball.id); }, style: {
                position: "absolute",
                width: imageSize,
                height: imageSize,
                cursor: "pointer"
            }, whileTap: { scale: 0.7 } })); }),
        react_1["default"].createElement(framer_motion_1.AnimatePresence, null, lives <= 0 && (react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, style: {
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            } },
            react_1["default"].createElement(material_1.Typography, { variant: "h3", sx: { color: "#ff4d4d", fontWeight: 900 } }, "GAME OVER"))))));
};
