"use strict";
exports.__esModule = true;
var react_1 = require("@ionic/react");
var react_router_1 = require("@ionic/react-router");
var react_router_dom_1 = require("react-router-dom");
var Home_1 = require("./pages/Home");
var Competition_1 = require("./pages/Competition");
// import MovingPicture from "./pages/MovingPicture";
var Intro_1 = require("./components/movinggame/Intro");
var MovingPictureGamePlay_1 = require("./components/MovingPictureGamePlay");
var TournamentLobby_1 = require("./components/TournamentLobby");
var Video_1 = require("./components/Video");
var ShortVideo_1 = require("./components/ShortVideo");
var FunnyVideo_1 = require("./components/FunnyVideo");
var InspiringVideo_1 = require("./components/InspiringVideo");
var AnimationVideo_1 = require("./components/AnimationVideo");
var Wallet_1 = require("./pages/Wallet");
var Profile_1 = require("./pages/Profile");
var AdminDashboard_1 = require("./components/AdminDashboard");
require("@ionic/react/css/core.css");
require("@ionic/react/css/normalize.css");
require("@ionic/react/css/structure.css");
require("@ionic/react/css/typography.css");
require("./theme/variables.css");
react_1.setupIonicReact();
var App = function () {
    return (React.createElement(react_1.IonApp, null,
        React.createElement(react_router_1.IonReactRouter, null,
            React.createElement(react_1.IonRouterOutlet, null,
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Home_1["default"] }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/games", component: Competition_1["default"] }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/games/moving-picture", component: Intro_1.MovingPhotoGame }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/games/moving-picture/lobby", component: TournamentLobby_1.TournamentLobby }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/games/moving-picture/play", component: MovingPictureGamePlay_1["default"] }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/videos", component: Video_1.VideoPage }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/videos/shorts", component: ShortVideo_1.Short }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/videos/funny-videos", component: FunnyVideo_1.Funny }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/videos/inspiration", component: InspiringVideo_1.Inspire }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/videos/animations", component: AnimationVideo_1.AnimationVideo }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/wallet", component: Wallet_1["default"] }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/profile", component: Profile_1["default"] }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/admin/dashboard", component: AdminDashboard_1.AdminDashboard })))));
};
exports["default"] = App;
