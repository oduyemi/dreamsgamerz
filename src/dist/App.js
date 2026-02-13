"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@ionic/react");
var react_router_1 = require("@ionic/react-router");
var react_router_dom_1 = require("react-router-dom");
var userContext_1 = require("./userContext");
/* PAGES */
var Home_1 = require("./pages/Home");
var Competition_1 = require("./pages/Competition");
var Wallet_1 = require("./pages/Wallet");
var Profile_1 = require("./pages/Profile");
/* AUTH */
var Login_1 = require("./pages/Login");
var Register_1 = require("./pages/Register");
/* GAMES */
var Intro_1 = require("./components/movinggame/Intro");
// import { MovingGame } from "./components/movinggame/Game";
var MovingPictureGame_1 = require("./components/MovingPictureGame");
var MovingPictureGamePlay_1 = require("./components/MovingPictureGamePlay");
var TournamentLobby_1 = require("./components/TournamentLobby");
/* VIDEOS */
var Video_1 = require("./components/Video");
var ShortVideo_1 = require("./components/ShortVideo");
var FunnyVideo_1 = require("./components/FunnyVideo");
var InspiringVideo_1 = require("./components/InspiringVideo");
var AnimationVideo_1 = require("./components/AnimationVideo");
/* ADMIN */
var AdminDashboard_1 = require("./components/AdminDashboard");
/* IONIC STYLES */
require("@ionic/react/css/core.css");
require("@ionic/react/css/normalize.css");
require("@ionic/react/css/structure.css");
require("@ionic/react/css/typography.css");
require("./theme/variables.css");
react_2.setupIonicReact();
var App = function () {
    var _a = react_1["default"].useState(3), lives = _a[0], setLives = _a[1];
    var handleLoseLife = function () {
        setLives(function (prev) { return Math.max(prev - 1, 0); });
    };
    return (react_1["default"].createElement(react_2.IonApp, null,
        react_1["default"].createElement(userContext_1.UserProvider, null,
            react_1["default"].createElement(react_router_1.IonReactRouter, null,
                react_1["default"].createElement(react_2.IonRouterOutlet, null,
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/login", component: Login_1["default"] }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/register", component: Register_1["default"] }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Home_1["default"] }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/games", component: Competition_1["default"] }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/games/moving-picture", component: Intro_1.MovingPhotoGame }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/games/moving-game/start", render: function () { return (react_1["default"].createElement(MovingPictureGame_1.GameArena, { lives: lives, onLoseLife: handleLoseLife })); } }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/games/moving-picture/lobby", component: TournamentLobby_1.TournamentLobby }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/games/moving-picture/play", component: MovingPictureGamePlay_1["default"] }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/videos", component: Video_1.VideoPage }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/videos/shorts", component: ShortVideo_1.Short }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/videos/funny-videos", component: FunnyVideo_1.Funny }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/videos/inspiration", component: InspiringVideo_1.Inspire }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/videos/animations", component: AnimationVideo_1.AnimationVideo }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/wallet", component: Wallet_1["default"] }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/profile", component: Profile_1["default"] }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/admin/dashboard", component: AdminDashboard_1.AdminDashboard }),
                    react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/" }))))));
};
exports["default"] = App;
