"use strict";
exports.__esModule = true;
exports.VideoPage = void 0;
var react_1 = require("@ionic/react");
var VideoSection_1 = require("./VideoSection");
var material_1 = require("@mui/material");
var react_router_1 = require("react-router");
var icons_1 = require("ionicons/icons");
var VideoHeader_1 = require("./VideoHeader");
var TrendingVideos_1 = require("./TrendingVideos");
// Dummy videos
var dummyYouTubeVideos = [
    { id: 1, title: "Epic Gameplay", youtubeId: "dQw4w9WgXcQ" },
    { id: 2, title: "Strategy Tips", youtubeId: "9bZkp7q19f0" },
    { id: 3, title: "Top 10 Moments", youtubeId: "3JZ_D3ELwOQ" },
    { id: 4, title: "Funny Highlights", youtubeId: "L_jWHffIx5E" },
    { id: 5, title: "New Trailer", youtubeId: "fJ9rUzIMcZQ" },
    { id: 6, title: "Best Plays", youtubeId: "CevxZvSJLk8" },
];
var mapToVideos = function (arr) {
    return arr.map(function (vid) { return ({
        id: vid.id,
        title: vid.title,
        thumbnail: "https://img.youtube.com/vi/" + vid.youtubeId + "/hqdefault.jpg",
        youtubeId: vid.youtubeId
    }); });
};
exports.VideoPage = function () {
    var history = react_router_1.useHistory();
    var location = react_router_1.useLocation();
    var theme = material_1.useTheme();
    var isSmall = material_1.useMediaQuery(theme.breakpoints.down("sm"));
    var navItems = [
        { label: "Home", icon: icons_1.home, path: "/" },
        { label: "Games", icon: icons_1.gameController, path: "/games" },
        { label: "Videos", icon: icons_1.image, path: "/videos" },
        { label: "Wallet", icon: icons_1.wallet, path: "/wallet" },
        { label: "Me", icon: icons_1.person, path: "/profile" },
    ];
    return (React.createElement(react_1.IonPage, null,
        React.createElement(react_1.IonContent, { fullscreen: true, style: { backgroundColor: "#fff" } },
            React.createElement(VideoHeader_1.VideoHeader, null),
            React.createElement(TrendingVideos_1.TrendingVideosSection, null),
            React.createElement(VideoSection_1.VideoSection, { title: "Most Viewed", videos: mapToVideos(dummyYouTubeVideos) }),
            React.createElement(VideoSection_1.VideoSection, { title: "Recently Viewed", videos: mapToVideos(dummyYouTubeVideos) }),
            React.createElement(VideoSection_1.VideoSection, { title: "Trending Now", videos: mapToVideos(dummyYouTubeVideos) }),
            React.createElement(VideoSection_1.VideoSection, { title: "Content of the Month", videos: mapToVideos(dummyYouTubeVideos) })),
        React.createElement(react_1.IonFooter, null,
            React.createElement(material_1.Paper, { elevation: 6, style: {
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "10px 16px",
                    borderRadius: "16px 16px 0 0",
                    backgroundColor: "#fff",
                    borderTop: "1px solid rgba(0,0,0,0.08)"
                } }, navItems.map(function (item, i) {
                var isActive = location.pathname === item.path;
                return (React.createElement(material_1.Stack, { key: i, alignItems: "center", spacing: 0.5 },
                    React.createElement(material_1.IconButton, { style: {
                            color: isActive ? "#111" : "#caa84c",
                            padding: 12,
                            transition: "all 0.25s ease"
                        }, onClick: function () { return history.push(item.path); }, onMouseEnter: function (e) {
                            return (e.currentTarget.style.color = isActive ? "#caa84c" : "#e65d0f");
                        }, onMouseLeave: function (e) {
                            return (e.currentTarget.style.color = isActive ? "#111" : "#caa84c");
                        } },
                        React.createElement(react_1.IonIcon, { icon: item.icon, style: { fontSize: 22 } })),
                    React.createElement(material_1.Typography, { style: {
                            fontSize: 10.5,
                            color: isActive ? "#111" : "#caa84c",
                            fontWeight: isActive ? 600 : 400,
                            letterSpacing: 0.4,
                            textTransform: "uppercase"
                        } }, item.label)));
            })))));
};
