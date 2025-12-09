"use strict";
exports.__esModule = true;
var react_1 = require("@ionic/react");
var material_1 = require("@mui/material");
var HomePage_1 = require("../components/HomePage");
var AppLayout_1 = require("../components/AppLayout");
var Home = function () {
    return (React.createElement(react_1.IonPage, null,
        React.createElement(AppLayout_1.AppLayout, null,
            React.createElement(material_1.GlobalStyles, { styles: {
                    body: { backgroundColor: '#ffffff' },
                    '@keyframes bounce-subtle': {
                        '0%, 100%': { transform: 'translateY(0) scale(1)' },
                        '50%': { transform: 'translateY(-8px) scale(1.02)' }
                    }
                } }),
            React.createElement(react_1.IonHeader, null,
                React.createElement(react_1.IonToolbar, { style: {
                        backgroundColor: '#fff',
                        borderBottom: '1px solid rgba(202,168,76,0.2)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    } },
                    React.createElement(react_1.IonTitle, { style: {
                            color: '#caa84c',
                            textAlign: 'center',
                            fontWeight: 700,
                            fontSize: '1.5rem'
                        } }, "Dream Gamers"))),
            React.createElement(react_1.IonContent, { fullscreen: true, style: {
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    overflowY: 'auto'
                } },
                React.createElement(HomePage_1.HomePage, null)))));
};
exports["default"] = Home;
