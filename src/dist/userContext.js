"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserProvider = exports.UserContext = void 0;
var react_1 = require("react");
var axios_1 = require("./lib/axios");
// CONTEXT 
exports.UserContext = react_1.createContext(undefined);
exports.UserProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(function () {
        try {
            var stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        }
        catch (error) {
            console.error("Failed to parse user from localStorage", error);
            return null;
        }
    }), user = _b[0], setUser = _b[1];
    var _c = react_1.useState(null), flashMessage = _c[0], setFlashMessage = _c[1];
    // LOGIN
    var handleLogin = function (email, password) { return __awaiter(void 0, void 0, Promise, function () {
        var res, _a, token, user_1, userData, err_1, error;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].post("/auth/login", { email: email, password: password })];
                case 1:
                    res = _d.sent();
                    _a = res.data, token = _a.token, user_1 = _a.user;
                    userData = {
                        userId: user_1.id,
                        username: user_1.username,
                        email: user_1.email,
                        role: user_1.role,
                        avatar: user_1.avatar,
                        referralCode: user_1.referralCode,
                        referredBy: user_1.referredBy,
                        membership: user_1.membership,
                        soundsEnabled: user_1.soundsEnabled
                    };
                    localStorage.setItem("user", JSON.stringify(userData));
                    localStorage.setItem("token", token);
                    setUser(userData);
                    setFlashMessage({
                        type: "success",
                        message: "Login successful. Welcome back!"
                    });
                    return [2 /*return*/, true];
                case 2:
                    err_1 = _d.sent();
                    error = err_1;
                    setFlashMessage({
                        type: "error",
                        message: ((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) ||
                            "Login failed. Please try again."
                    });
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // LOGOUT
    var handleLogout = function () {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        window.location.href = "/login";
    };
    return (react_1["default"].createElement(exports.UserContext.Provider, { value: {
            user: user,
            setUser: setUser,
            flashMessage: flashMessage,
            handleLogin: handleLogin,
            handleLogout: handleLogout
        } }, children));
};
