"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var HomePage_1 = require("../components/HomePage");
var AppLayout_1 = require("../components/AppLayout");
var Home = function () {
    return (React.createElement(AppLayout_1.AppLayout, null,
        React.createElement(material_1.GlobalStyles, { styles: {
                body: { backgroundColor: '#ffffff' },
                '@keyframes bounce-subtle': {
                    '0%, 100%': { transform: 'translateY(0) scale(1)' },
                    '50%': { transform: 'translateY(-8px) scale(1.02)' }
                }
            } }),
        React.createElement("div", { style: {
                backgroundColor: '#fff',
                width: '100%',
                padding: '16px 0',
                textAlign: 'center',
                borderBottom: '1px solid rgba(202,168,76,0.2)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            } },
            React.createElement("h1", { style: { color: '#caa84c', fontWeight: 700 } }, "Dream Gamers")),
        React.createElement("div", { style: {
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: 'calc(100vh - 90px)'
            } },
            React.createElement(HomePage_1.HomePage, null))));
};
exports["default"] = Home;
