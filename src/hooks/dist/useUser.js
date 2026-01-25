"use strict";
exports.__esModule = true;
exports.useUser = void 0;
var react_1 = require("react");
var userContext_1 = require("../userContext");
exports.useUser = function () {
    var context = react_1.useContext(userContext_1.UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
