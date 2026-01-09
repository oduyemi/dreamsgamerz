"use strict";
exports.__esModule = true;
exports.AppLayout = void 0;
var react_1 = require("@ionic/react");
var react_router_dom_1 = require("react-router-dom");
var material_1 = require("@mui/material");
var icons_1 = require("ionicons/icons");
exports.AppLayout = function (_a) {
    var children = _a.children;
    var history = react_router_dom_1.useHistory(); // v5
    var location = react_router_dom_1.useLocation();
    var navItems = [
        { label: 'Home', icon: icons_1.home, path: '/' },
        { label: 'Games', icon: icons_1.gameController, path: '/games' },
        { label: 'Videos', icon: icons_1.image, path: '/videos' },
        { label: 'Wallet', icon: icons_1.wallet, path: '/wallet' },
        { label: 'Me', icon: icons_1.person, path: '/profile' },
    ];
    return (React.createElement(react_1.IonPage, null,
        React.createElement(react_1.IonContent, { fullscreen: true },
            React.createElement(material_1.Box, { sx: {
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#fff',
                    pb: '90px'
                } }, children)),
        React.createElement(material_1.Paper, { elevation: 8, sx: {
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                borderRadius: '16px 16px 0 0',
                backgroundColor: 'white',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                zIndex: 2000
            } },
            React.createElement(material_1.Box, { sx: {
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    py: 1.2
                } }, navItems.map(function (item, i) {
                var isActive = location.pathname === item.path;
                return (React.createElement(material_1.Stack, { key: i, alignItems: "center", spacing: 0.4, sx: {
                        cursor: 'pointer',
                        color: isActive ? '#111' : '#caa84c',
                        transition: 'all 0.25s ease',
                        '&:hover': {
                            color: '#caa84c',
                            transform: 'translateY(-3px)'
                        }
                    }, onClick: function () { return history.push(item.path); } },
                    React.createElement(material_1.IconButton, { sx: {
                            color: 'inherit',
                            p: 1,
                            '&:hover': { transform: 'scale(1.15)' },
                            transition: 'transform 0.25s ease'
                        } },
                        React.createElement(react_1.IonIcon, { icon: item.icon, style: { fontSize: 22 } })),
                    isActive && (React.createElement(material_1.Box, { sx: {
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: '#caa84c',
                            boxShadow: '0 0 6px rgba(202,168,76,0.7)'
                        } })),
                    React.createElement(material_1.Typography, { variant: "caption", sx: {
                            fontSize: 10,
                            textTransform: 'uppercase',
                            fontWeight: isActive ? 600 : 400,
                            letterSpacing: 0.4
                        } }, item.label)));
            })))));
};
