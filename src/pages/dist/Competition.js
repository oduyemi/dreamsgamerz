"use strict";
exports.__esModule = true;
var GamersCompetitionTab_1 = require("../components/GamersCompetitionTab");
var AppLayout_1 = require("../components/AppLayout");
var material_1 = require("@mui/material");
var Competition = function () {
    var theme = material_1.useTheme();
    var isSmall = material_1.useMediaQuery(theme.breakpoints.down('sm'));
    return (React.createElement(AppLayout_1.AppLayout, null,
        React.createElement("div", { className: "header" },
            React.createElement("h1", { style: { fontSize: isSmall ? '1.2rem' : '1.5rem' } })),
        React.createElement("div", { className: "page-content" },
            React.createElement(GamersCompetitionTab_1.GamersCompetitionTab, null))));
};
exports["default"] = Competition;
