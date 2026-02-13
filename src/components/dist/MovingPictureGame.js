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
    var _b = react_1.useState({ width: 600, height: 400 }), arenaSize = _b[0], setArenaSize = _b[1];
    var _c = react_1.useState([]), balls = _c[0], setBalls = _c[1];
    var _d = react_1.useState(0), score = _d[0], setScore = _d[1];
    var _e = react_1.useState(1), level = _e[0], setLevel = _e[1];
    var _f = react_1.useState(false), netSwing = _f[0], setNetSwing = _f[1];
    var imageSize = 30;
    var circleSize = 260;
    var holeSize = 160;
    var swishSound = react_1.useRef(null);
    /* ---------- INIT ---------- */
    react_1.useEffect(function () {
        if (arenaRef.current) {
            setArenaSize({
                width: arenaRef.current.offsetWidth,
                height: arenaRef.current.offsetHeight
            });
        }
        swishSound.current = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-basketball-swish-2013.mp3");
    }, []);
    /* ---------- SPAWN BALLS ---------- */
    react_1.useEffect(function () {
        if (lives <= 0)
            return;
        var spawnInterval = setInterval(function () {
            spawnBall();
        }, Math.max(2000 - level * 150, 600)); // difficulty increases
        return function () { return clearInterval(spawnInterval); };
    }, [level, lives]);
    var spawnBall = function () {
        var width = arenaSize.width, height = arenaSize.height;
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
    /* ---------- HANDLE CLICK ---------- */
    var handleHit = function (id) {
        setBalls(function (prev) { return prev.filter(function (b) { return b.id !== id; }); });
        setScore(function (prev) {
            var newScore = prev + 1;
            if (newScore % 5 === 0) {
                setLevel(function (l) { return l + 1; });
            }
            return newScore;
        });
        if (swishSound.current) {
            swishSound.current.currentTime = 0;
            swishSound.current.play();
        }
        triggerNetSwing();
    };
    /* ---------- FAIL ---------- */
    var handleMiss = function (id) {
        setBalls(function (prev) { return prev.filter(function (b) { return b.id !== id; }); });
        onLoseLife();
        triggerNetSwing();
    };
    /* ---------- NET SWING ---------- */
    var triggerNetSwing = function () {
        setNetSwing(true);
        setTimeout(function () { return setNetSwing(false); }, 600);
    };
    var centerX = arenaSize.width / 2 - imageSize / 2;
    var centerY = arenaSize.height / 2 - imageSize / 2;
    return (react_1["default"].createElement(material_1.Box, { ref: arenaRef, sx: {
            position: "relative",
            width: "100%",
            height: 450,
            mt: 4,
            borderRadius: 4,
            background: "radial-gradient(circle,#f8fafc,#e2e8f0)",
            overflow: "hidden"
        } },
        react_1["default"].createElement(material_1.Typography, { sx: {
                position: "absolute",
                top: 10,
                left: 20,
                fontWeight: 800
            } },
            "Score: ",
            score,
            " | Level: ",
            level),
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
                    border: "18px solid #ff6b00",
                    boxShadow: "0 0 40px rgba(255,107,0,0.7)"
                } }),
            react_1["default"].createElement(material_1.Box, { sx: {
                    width: holeSize,
                    height: holeSize,
                    borderRadius: "50%",
                    background: "radial-gradient(circle,#000 40%,#111 70%)",
                    boxShadow: "inset 0 0 40px rgba(0,0,0,1)"
                } })),
        balls.map(function (ball) { return (react_1["default"].createElement(framer_motion_1.motion.img, { key: ball.id, src: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png", initial: { x: ball.startX, y: ball.startY }, animate: {
                x: centerX,
                y: centerY,
                transition: {
                    duration: 3 - level * 0.2,
                    ease: "linear"
                }
            }, onAnimationComplete: function () { return handleMiss(ball.id); }, onClick: function () { return handleHit(ball.id); }, style: {
                position: "absolute",
                width: imageSize,
                height: imageSize,
                cursor: "pointer"
            }, whileTap: {
                scale: 0.6,
                y: centerY + 20,
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                }
            } })); }),
        lives <= 0 && (react_1["default"].createElement(material_1.Typography, { variant: "h4", sx: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                fontWeight: 900,
                color: "#e63946"
            } }, "GAME OVER"))));
};
